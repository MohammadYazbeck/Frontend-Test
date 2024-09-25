export function validateLogin({ username, password }) {
    const errors = {}

    if (username.trim() === '') {
        errors.username = 'الرجاء ادخال أسم المستخدم*'
    } else if (username.length < 4) {
        errors.username =
            'يجب أن يكون أسم المستخدم مكون من اربع محارف على الأقل*'
    }

    if (password.trim() === '') {
        errors.password = 'الرجاء ادخال كلمة المرور*'
    } else if (password.length < 10) {
        errors.password =
            'يجب أن تكون كلمة المرور مكونة من عشر محارف على الأقل*'
    }

    return errors
}

export function validateChangePassword({ password, confirmPassword }) {
    const errors = {}

    if (password.trim() === '') {
        errors.password = 'الرجاء ادخال كلمة المرور*'
    } else if (password.length < 10) {
        errors.password =
            'يجب أن تكون كلمة المرور مكونة من عشر محارف على الأقل*'
    }

    if (confirmPassword.trim() === '') {
        errors.confirmPassword = 'الرجاء تأكيد كلمة المرور*'
    } else if (confirmPassword.length < 10) {
        errors.confirmPassword =
            'يجب أن تكون كلمة المرور مكونة من عشر محارف على الأقل*'
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = 'الحقل لايتطابق مع كلمة المررور*'
    }

    return errors
}

export function validateDeleteDb({ adminPassword, dbKey }) {
    const errors = {}

    if (dbKey.trim() === '') {
        errors.dbKey = 'الرجاء ادخال مفتاح قاعدة البيانات*'
    } else if (dbKey.length < 10) {
        errors.dbKey =
            'يجب أن يكون مفتاح قاعدة البيانات مكون من عشر محارف على الأقل*'
    }

    if (adminPassword.trim() === '') {
        errors.adminPassword = 'الرجاء ادخال كلمة المرور*'
    } else if (adminPassword.length < 10) {
        errors.adminPassword =
            'يجب أن تكون كلمة المرور مكونة من عشر محارف على الأقل*'
    }

    return errors
}
