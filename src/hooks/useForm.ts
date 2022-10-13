import { useState, ChangeEvent, useEffect, useMemo } from "react";
import {
	FormField,
	FormFieldValidations,
	IForm,
	IFormCheckedValues,
	IFormValidations,
	INote,
	INoteCheckedValues,
	INoteValidations,
} from "../interfaces";

export const useForm = (
	initialForm: IForm,
	formValidations: IFormValidations
) => {
	const [formState, setFormState] = useState(initialForm);
	const [formValidation, setFormValidation] = useState<IFormCheckedValues>({
		displayNameValid: null,
		emailValid: null,
		passwordValid: null,
		idValid: null,
		titleValid: null,
		bodyValid: null,
		dateValid: null,
	});
	const [formSubmitted, setFormSubmitted] = useState(false);

	useEffect(() => {
		createValidators();
	}, [formState]);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const isFormValid = useMemo(() => {
		for (const formValue of Object.keys(formValidation)) {
			if (formValidation[formValue as FormFieldValidations] !== null) {
				return false;
			}
		}

		return true;
	}, [formState, formValidation]);

	const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	const createValidators = () => {
		const formCheckedValues = {} as IFormCheckedValues;

		for (const formField of Object.keys(formValidations)) {
			const [fn, errorMessage] = formValidations[formField as FormField]!;

			formCheckedValues[`${formField as FormField}Valid`] = fn(
				formState[formField as FormField]!
			)
				? null
				: errorMessage;

			setFormValidation(formCheckedValues);
		}
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		createValidators,
		...formValidation,
		isFormValid,
		formSubmitted,
		setFormSubmitted,
	};
};
