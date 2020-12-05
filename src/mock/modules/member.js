module.exports = [
    {
        url: 'member/login',
        type: 'post',
        result: option => {
            return {
                error: '',
                state: 1,
                data: {
                    account: option.body.account,
                    token: '@string',
                    failure_time: Date.parse(new Date()) / 1000 + 24 * 60 * 60
                }
            }
        }
    },
    {
        url: 'member/permission',
        type: 'get',
        result: option => {
            // console.log("option-----------",option)
            let permissions = []
            if (option.query.account == 'admin') {
                permissions = [
                    'platfrom.browse',
                    'platfrom.create',
                    'platfrom.edit',
                    'platfrom.remove'
                ]
            } else if (option.query.account == 'test') {
                permissions = [
                    'permission.browse'
                ]
            }
            return {
                error: '',
                state: 1,
                data: {
                    permissions
                }
            }
        }
    }
]
