
import { toast } from 'react-toastify';
const ValidateForm = (formData, route) => {
    let valid = true;

    const isValidEmail = (email) => {
        // Email validation regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    if (route == "login") {
        if (!formData.email) {
            toast.error('Please enter Email');
            valid = false;
        } else if (!isValidEmail(formData.email)) {
            toast.error('Please enter a valid Email');
            valid = false;
        }

        if (!formData.password) {
            toast.error('Please enter Password');
            valid = false;
        } else if (formData.password.length < 6) {
            toast.error('Password must be more than 6 characters');
            valid = false;
        }
    } else {
        if (!formData.firstName) {
            toast.error('Please enter First Name');
            valid = false;
        }

        if (!formData.lastName) {
            toast.error('Please enter Last Name');
            valid = false;
        }

        if (!formData.preferredLanguage) {
            toast.error('Please enter Preferred Language');
            valid = false;
        }

        if (!formData.email) {
            toast.error('Please enter Email');
            valid = false;
        } else if (!isValidEmail(formData.email)) {
            toast.error('Please enter a valid Email');
            valid = false;
        }

        if (!formData.password) {
            toast.error('Please enter a password');
            valid = false;
        } else if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            valid = false;
        } else if (formData.password.length > 100) {
            toast.error('Password length exceeds the limit');
            valid = false;
        }
        if (!formData.confirmPassword) {
            toast.error('Please enter Confirm Password');
            valid = false;
        }
    }
    return valid;
};

export default ValidateForm;