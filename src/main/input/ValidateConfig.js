export function validateRequire(value) {
    if (value.trim() === '') {
        return 'Vui lòng nhập giá trị';
    }
    return '';
}

export function validateEmail(value) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const requiredError = validateRequire(value);

    if (requiredError) {
        return 'Input Email';
    }
    if (!value.match(validRegex)) {
        return 'Email Invalid';
    }
    return '';
}

export function validatePhoneNumber(value) {
    const requiredError = validateRequire(value);
    if (requiredError) {
        return 'Input PhoneNumber';
    }
    const validRegexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if (!value.match(validRegexPhone)) {
        return 'Phone Number Invalid';
    }
    return '';
}

export function validatePassword(value) {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (!value.match(lowerCaseLetters)) {
        return 'Password must contain at least 1 lowercase character';
    }
    if (!value.match(upperCaseLetters)) {
        return 'Password must contain at least 1 uppercase character';
    }
    if (!value.match(numbers)) {
        return 'Password must number';
    } if (value.length < 8) {
        return 'Password must length > 8 character';
    }
}

export function validateDate(value) {
    var today = new Date();
    var tomorrow = new Date(today); // lấy ra ngày hiện tại + 1 
    var input = new Date(value) // lấy ra ngày nhập vào
    tomorrow.setDate(tomorrow.getDate() + 1); //lấy ra ngày hiện tại + 1
    console.log(input);
    console.log(tomorrow); 
    if (input >= tomorrow) {
        return 'Input False,Input larger today';
    }
    return '';

}