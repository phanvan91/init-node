class UserRequest {
    static rules() {
        return {
            name: 'required|string',
            email: 'required|email',
            age: 'optional|numeric|min:18',
        };
    }

    static messages() {
        return {
            'name.required': 'Tên là bắt buộc',
            'age.numeric': 'Tuổi phải là số',
            'age.min': 'Tuổi tối thiểu là 18',
        };
    }
}

module.exports = UserRequest;
