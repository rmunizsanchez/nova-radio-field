import _ from 'lodash';

export default {
    mounted() {
        this.toggleEnabled = this.field.toggle && (_.toArray(this.field.toggle).length || _.toArray(_.get(this.field,'toggle_radio', [])).length);

        if (this.toggleEnabled) {
            this.mapFields();
            this.calculateFieldVisibility();
        }
    },
    computed: {

    },
    data() {
        return {
            toggleEnabled: false,
            toggleFields: {},
            toggleOptions: {},
            recheck:{}
        }
    },
    methods: {
        findFieldsWhichCanBeToggled() {
            const fieldsToToggle = _.uniq(
                _.flatten(
                    _.toArray(this.field.toggle)
                )
            );
            const vm = this;

            const fieldsInternal = _.filter(_.uniq(
                _.flatten(
                    _.toArray(this.field.toggle_radio)
                )
            ), function (o) {
                return !_.isArray(o)}).forEach(element => {
                    _.forEach(element, function (value, key) {
                        _.forEach(value, function (item) {
                            _.forEach(item, function (itemValue) {
                                const keyitem = key+'_'+itemValue
                                vm.toggleOptions[keyitem] = document.getElementById(keyitem);
                            })
                        })

                    })
                });

            this.$parent.$children.filter(c => c.field).forEach(component => {
                if (fieldsToToggle.indexOf(component.field.attribute) !== -1) {
                    this.toggleFields[component.field.attribute] = component;
                }
            });

        },
        generateFieldMap() {

        },
        mapFields() {
            this.findFieldsWhichCanBeToggled();
            this.generateFieldMap();
        },
        resetVisibility() {
            _.each(this.toggleFields, field => {
                field.$el.classList.remove('mlbz-hidden');
                if (typeof field.calculateFieldVisibility !== 'undefined' && field.toggleEnabled) {
                    this.recheck[field.field.attribute]=field;
                }
            });
            _.each(this.toggleOptions, field => {
                field.parentElement.parentElement.classList.remove('mlbz-hidden');

            });
        },
        calculateFieldVisibility() {
            console.log(this.rawValue);

            if (this.rawValue != undefined) {
                this.resetVisibility();
                const fields = this.field.toggle[this.rawValue];
                console.log(fields);
                (fields || []).forEach(field => {
                    if (this.toggleFields[field]) {
                        this.toggleFields[field].$el.classList.add('mlbz-hidden')
                    }
                })

                const fieldsRadio = _.get(this.field, 'toggle_radio', [])[this.rawValue];
                const vm = this;
                if (fieldsRadio !== undefined && !_.isArray(fieldsRadio)) {
                    ([fieldsRadio]).forEach(field => {
                        _.forEach(field, function (value, key) {
                            _.forEach(value, function (item) {
                                _.forEach(item, function (itemValue) {
                                    const keyitem = key + '_' + itemValue
                                    if (vm.toggleOptions[keyitem]) {
                                        vm.toggleOptions[keyitem].parentElement.parentElement.classList.add('mlbz-hidden')
                                    }
                                })

                            })
                        })
                    })
                }
                if (_.toArray(this.recheck).length > 0) {
                    (_.toArray(this.recheck)).forEach(field => {
                        console.log(field)
                        if (typeof field.calculateFieldVisibility !== 'undefined' && field.toggleEnabled) {
                            field.calculateFieldVisibility()
                        }
                    })
                }
            }
        }
    },
    watch: {
        value() {
            return this.toggleEnabled && this.calculateFieldVisibility();
        }
    }
}
