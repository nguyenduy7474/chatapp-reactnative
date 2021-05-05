export default {
    id: '1',
    users: [{
        id: 'u1',
        name: 'EU',
        imageUri: 'https://wwpath.net/wp-content/uploads/2020/09/lienminhchauAuavatar.png',
    }, {
        id: 'u2',
        name: 'India',
        imageUri: 'https://vietship.net/wp-content/uploads/2017/12/van-chuyen-hang-hoa-theo-duong-bien122-5.png',
    }],
    messages: [{
        id: 'm1',
        content: 'How are you, Lukas!',
        createdAt: '2020-10-10T12:48:00.000Z',
        user: {
            id: 'u1',
            name: 'EU',
        },
    }, {
        id: 'm2',
        content: 'I am good, good',
        createdAt: '2020-10-03T14:49:00.000Z',
        user: {
            id: 'u2',
            name: 'India',
        },
    }, {
        id: 'm3',
        content: 'What about you?',
        createdAt: '2020-10-03T14:49:40.000Z',
        user: {
            id: 'u2',
            name: 'India',
        },
    }, {
        id: 'm4',
        content: 'Good as well, preparing for the stream now.',
        createdAt: '2020-10-03T14:50:00.000Z',
        user: {
            id: 'u1',
            name: 'EU',
        },
    }, {
        id: 'm5',
        content: 'How is your uni going?',
        createdAt: '2020-10-03T14:51:00.000Z',
        user: {
            id: 'u1',
            name: 'EU',
        },
    }, {
        id: 'm6',
        content: 'It is a bit tough, as I have 2 specializations. How about yours? Do you enjoy it?',
        createdAt: '2020-10-03T14:49:00.000Z',
        user: {
            id: 'u2',
            name: 'India',
        },
    }, {
        id: 'm7',
        content: 'Big Data is really interesting. Cannot wait to go through all the material.',
        createdAt: '2020-10-03T14:53:00.000Z',
        user: {
            id: 'u1',
            name: 'EU',
        },
    }]
}
