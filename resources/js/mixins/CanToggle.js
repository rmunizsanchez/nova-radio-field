import _ from 'lodash';

export default {
    mounted() {
        this.toggleEnabled = this.field.toggle && _.toArray(this.field.toggle).length;

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
            toggleOptions: {}
        }
    },
    methods: {
        findFieldsWhichCanBeToggled() {
            const fieldsToToggle = _.filter(_.uniq(
                _.flatten(
                    _.toArray(this.field.toggle)
                )
            ), function (o) {
                return !_.isObject(o)});

            const vm = this;
            const fieldsInternal = _.filter(_.uniq(
                _.flatten(
                    _.toArray(this.field.toggle)
                )
            ), function (o) {
                return _.isObject(o)}).forEach(element => {
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
            });
            _.each(this.toggleOptions, field => {
                field.parentElement.parentElement.classList.remove('mlbz-hidden');
            });
        },
        calculateFieldVisibility() {
            this.resetVisibility();

            if (this.rawValue == undefined) {
                if (this.field.hasOwnProperty('hidden')) {
                    this.$el.classList.add('mlbz-hidden')
                }
            } else {
                const fields = this.field.toggle[this.rawValue];
                const vm = this;
                if (!_.isArray(fields)) {
                    ([fields]).forEach(field => {
                        _.forEach(field, function (value, key) {
                            _.forEach(value, function (item) {
                                _.forEach(item, function (itemValue) {
                                    const keyitem = key+'_'+itemValue
                                    if (vm.toggleOptions[keyitem]) {
                                        vm.toggleOptions[keyitem].parentElement.parentElement.classList.add('mlbz-hidden')
                                    }
                                })

                            })

                        })

                    })
                } else {
                    (fields || []).forEach(field => {
                        if (this.toggleFields[field]) {
                            this.toggleFields[field].$el.classList.add('mlbz-hidden')
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
