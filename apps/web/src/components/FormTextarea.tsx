import {
  useEffect,
  useRef,
  useState,
  type TextareaHTMLAttributes,
} from 'react';
import { useFieldContext, useFormContext } from 'fragui';

export interface FormTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  name?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function FormTextarea({
  name: nameProp,
  value,
  defaultValue = '',
  disabled: disabledProp = false,
  onChange,
  onBlur,
  onFocus,
  className,
  style,
  ...rest
}: FormTextareaProps) {
  const fieldCtx = useFieldContext();
  const formCtx = useFormContext();
  const name = nameProp ?? fieldCtx?.name;
  const disabled = (fieldCtx?.disabled ?? false) || disabledProp;
  const inputId = rest.id ?? fieldCtx?.inputId;
  const describedBy = rest['aria-describedby'] ?? fieldCtx?.describedById;
  const status = fieldCtx?.status ?? 'idle';
  const isControlled = value !== undefined;
  const formValue = formCtx && name && !isControlled ? formCtx.values[name] : undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled
    ? value
    : typeof formValue === 'string'
      ? formValue
      : internalValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (formCtx && name) {
      formCtx.registerRef(name, textareaRef as unknown as React.RefObject<HTMLElement | null>);
      return () => formCtx.unregisterRef(name);
    }
    return undefined;
  }, [formCtx, name]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value;
    if (!isControlled && !formCtx) {
      setInternalValue(nextValue);
    }
    if (formCtx && name) {
      formCtx.setValue(name, nextValue);
    }
    onChange?.(nextValue, event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (formCtx && name) {
      formCtx.setTouched(name);
    }
    onBlur?.(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    onFocus?.(event);
  };

  return (
    <textarea
      {...rest}
      ref={textareaRef}
      id={inputId}
      name={name}
      disabled={disabled}
      aria-invalid={status === 'error' ? 'true' : rest['aria-invalid']}
      aria-describedby={describedBy}
      value={isControlled || formCtx ? (currentValue ?? '') : undefined}
      defaultValue={isControlled || formCtx ? undefined : defaultValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      className={className}
      style={style}
    />
  );
}