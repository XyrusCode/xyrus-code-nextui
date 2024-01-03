import {useState} from 'react';

const useContactForm = () => {
	const [values, setValues] = useState({
		email: '',
		subject: '',
		message: '',
	});

	  const resetForm = () => {
		setValues({
			email: '',
			subject: '',
			message: '',
		});
	};

	const handleChange = (e: any) => {
		setValues(prevState => {
			return {
				...prevState,
				[e.target.id]: e.target.value,
			};
		});
	};

	return { values, handleChange, resetForm };
};

export default useContactForm;