<?php

namespace OwenMelbz\RadioField;

use Laravel\Nova\Fields\Field;
use Laravel\Nova\Http\Requests\NovaRequest;

class RadioButton extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'radio-field';

    /**
     * The text alignment for the field's text in tables.
     *
     * @var string
     */
    public $textAlign = 'center';
    
    
    /**
     * Which value should be the default?
     *
     * @param mixed $default
     * @return RadioButton
     */
    public function default($default)
    {
        $this->withMeta(['default' => $default]);

        return $this;
    }

    /**
     * This is a key => value pair of the value => label for the radios.
     *
     * @param mixed $options
     * @return RadioButton
     */
    public function options($options)
    {
        if (is_array($options)) {
            $this->withMeta(['options' => $options]);
        }
        
        if (is_callable($options)) {
            $this->withMeta(['options' => call_user_func($options)]);
        }

        return $this;
    }

    /**
     * Should we stack the radios rather than side by side?
     *
     * @return RadioButton
     */
    public function stack()
    {
        $this->withMeta(['stack' => true]);

        return $this;
    }

    /**
     * Sometimes when you have many radios, you need
     * extra margin between them.
     *
     * @return RadioButton
     */
    public function marginBetween()
    {
        $this->withMeta(['marginBetween' => true]);

        return $this;
    }

    /**
     * By default on the detail view, we'll map the value
     * back to the option that was picked, if you do not
     * want that to happen, then skip the transforming here!
     *
     * @return RadioButton
     */
    public function skipTransformation()
    {
        $this->withMeta(['skipTransformation' => true]);

        return $this;
    }

    /**
     * This accepts an array of values, of which the key
     * represents the models value, and the value of the entry
     * is an array of fields which you wish to hide, when the value is of that.
     *
     * [
     *     1 => ['email'] // when the value is 1, it will hide the email field.
     * ]
     *
     * @param array $fields
     * @return RadioButton
     */
    public function toggle(array $fields = [])
    {
        $this->withMeta(['toggle' => $fields]);

        return $this;
    }
    
    /**
     * @return RadioButton
     */
    public function hidden()
    {
        $this->withMeta(['hidden' => true]);
        return $this;
    }
    
    /**
     * @param  array  $fields
     *
     * @return \OwenMelbz\RadioField\RadioButton
     */
    public function toggleRadio(array $fields = [])
    {
        $this->withMeta(['toggle_radio' => $fields]);
    
        return $this;
    }
}
