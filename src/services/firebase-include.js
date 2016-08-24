/**
 * Firebase's namespacing system requires that all includes are done within the
 * same scope, and ES2015 modules don't play well with this system.
 */

import firebase from 'firebase/app'

// Disable Firebase features you don't want by commenting the import
import 'firebase/auth'
// import 'firebase/database'
import 'firebase/storage'

export default firebase
