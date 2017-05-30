export default {
    pos: {
        search: '搜索',
        configuration: '配置',
        mongodb: '数据库控制台',
        language: '语言',
        theme: {
            name: '主题',
            light: '白色',
            dark: '黑色',
        },
        dashboard: {
            monthly_revenue: '每月收入',
            new_orders: '新订单',
            pending_reviews: '等待审核',
            new_customers: '新客户',
            pending_orders: '等待订单',
            order: {
                items: 'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
            welcome: {
                title: '欢迎来到管理系统0',
                subtitle: '这是一个虚构的海报店的管理员。可以自由地探索和修改数据——它在你的计算机上是本地的，并且每次重新加载时都会重置。',
                demo_button: '来源这个演示',
            },
        },
    },
    resources: {
        users: {
            name: '用户 |||| 用户',
            fields: {
                id: 'ID',
                avatar: "头像",
                username: '用户名',
                password: '密码',
                email: '邮箱',
                createDate: '创建时间',
            },
            tabs: {
                identity: '身份',
                details: '基本信息'
            },
            page: {
                delete: '删除用户',
            }
        },
        customers: {
            name: '客户 |||| 客户',
            fields: {
                commands: '订单',
                groups: '组',
                last_seen_gte: '最后访问',
                has_ordered: '是否有订单',
                has_newsletter: '是否有消息',
                name: '姓名',
            },
            tabs: {
                identity: '身份',
                address: '地址',
                orders: '订单',
                reviews: '审核',
                stats: '状态',
            },
            page: {
                delete: '删除客户',
            },

        },
        commands: {
            name: '订单 |||| 列表',
            fields: {
                basket: {
                    delivery: '交付',
                    reference: '引用',
                    quantity: '数量',
                    sum: '总数',
                    tax_rate: '税率',
                    total: '总价',
                    unit_price: '单价',
                },
                customer_id: '客户',
                date_gte: '开始',
                date_lte: '结束',
                total_gte: '最少数量',
            },
        },
        products: {
            name: '海报 |||| 列表',
            fields: {
                category_id: '类别',
                height_gte: 'Min height',
                height_lte: 'Max height',
                height: 'Height',
                image: 'Image',
                price: 'Price',
                reference: 'Reference',
                stock_lte: 'Low Stock',
                stock: 'Stock',
                thumbnail: 'Thumbnail',
                width_gte: 'Min width',
                width_lte: 'mx_width',
                width: 'Width',
            },
            tabs: {
                image: 'Image',
                details: 'Details',
                description: 'Description',
                reviews: 'Reviews',
            },
        },
        categories: {
            name: '类别 |||| 列表',
            fields: {
                name: '名称',
                products: '商品',
            },
            tabs: {
                details: '基本信息',
            },
            page: {
                delete: '删除类别',
            }
        },
        reviews: {
            name: 'Review |||| Reviews',
            fields: {
                customer_id: 'Customer',
                command_id: 'Order',
                product_id: 'Product',
                date_gte: 'Posted since',
                date_lte: 'Posted before',
                date: 'Date',
                comment: 'Comment',
                rating: 'Rating',
            },
            action: {
                accept: 'Accept',
                reject: 'Reject',
            },
            notification: {
                approved_success: 'Review approved',
                approved_error: 'Error: Review not approved',
                rejected_success: 'Review rejected',
                rejected_error: 'Error: Review not rejected',
            },
        },
        segments: {
            name: 'Segments',
            fields: {
                customers: 'Customers',
                name: 'Name',
            },
            data: {
                compulsive: 'Compulsive',
                collector: 'Collector',
                ordered_once: 'Ordered once',
                regular: 'Regular',
                returns: 'Returns',
                reviewer: 'Reviewer',
            },
        },
    },
};
