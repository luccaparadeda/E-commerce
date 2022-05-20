import {FormInputLabel, Group, Input} from './form-input.styles.jsx'

export const FormInput = ({label, ...otherProps}) => {
    return(
        <Group>
        <Input {...otherProps} />
        {label && (
          <FormInputLabel shrink={otherProps.value.length}>
            {label}
          </FormInputLabel>
        )}
      </Group>
    )
}