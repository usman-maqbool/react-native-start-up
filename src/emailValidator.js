export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "user can't be empty."
    // if (!re.test(email)) return 'Ooops! We need a valid email address.'
    return ''
  }
  

// export function emailValidator(email) {
//   const re = /^\d+$/
//   if (!email) return "Student Id can't be empty."
//   if (!re.test(email)) return 'Ooops! We need a valid student ID.'
//   return ''
// }