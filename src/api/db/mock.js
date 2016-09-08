export default {
    users: {
        // House Lannister
        'cersei':   { displayName: 'Cersei Lannister' },
        'jaime':    { displayName: 'Jaime Lannister' },
        'tyrion':   { displayName: 'Tyrion Lannister' },
        'tywin':    { displayName: 'Tywin Lannister' },

        // House Baratheon
        'robert':   { displayName: 'Robert Baratheon' },
        'joffrey':  { displayName: 'Joffrey Baratheon' },
        'myrcella': { displayName: 'Myrcella Baratheon' },
        'tommen':   { displayName: 'Tommen Baratheon' },

        // House Stark
        'ned':      { displayName: 'Eddard Stark' },
        'catelyn':  { displayName: 'Catelyn Stark' },
        'jon':      { displayName: 'Jon Snow' },
        'robb':     { displayName: 'Robb Stark' },
        'sansa':    { displayName: 'Sansa Stark' },
        'arya':     { displayName: 'Arya Stark' },
        'bran':     { displayName: 'Bran Stark' },
        'rickon':   { displayName: 'Rickon Stark' }
    },
    online_users: {
        'cersei': {
            'iphone': 123456789     // string(userAgentHash): timestamp of last connection
        },
        'jaime': {
            'chrome': 123456789,
            'iphone': 587232192
        }
    },
    games: {
        CLASHOFKINGS: {
            game_date: '',
            event_date: '',
            participants: [ 'tywin', 'robert', 'ned' ],
            assignations: { // Order: giver: receiver
                'cersei':   'jaime',
                'arya':     'joffrey'
            }
        }
    },
    relationships: {
        'cersei': {
            otherHalf:  [ 'robert', 'jaime' ],
            children:   [ 'joffrey', 'myrcella', 'tommen' ],
            parents:    [ 'tywin' ],
            siblings:   [ 'jaime', 'tyrion' ]
        },
        'jaime': {
            otherHalf:  [ 'cersei' ],
            children:   [ 'joffrey', 'myrcella', 'tommen' ],
            parents:    [ 'tywin' ],
            siblings:   [ 'cersei', 'tyrion' ]
        },
        'tywin': {
            children:   [ 'cersei', 'jaime', 'tyrion' ]
        },
        'robert': {
            otherHalf:  [ 'cersei' ],
            children:   [ 'joffrey', 'myrcella', 'tommen' ]
        }
    },
    chat: {
        users: {
            'cersei': {
                online:     true,
                typing:     'jaime'
            },
            'jaime': {
                online:     true,
                typing:     false
            }
        },
        messages: {
            CLASHOFKINGS: {
                'jaime': {
                    // Here are the messages for jaime
                },
                'cersei': {
                    // Here are the messages for cersei
                }
            }
        }
    }
}
