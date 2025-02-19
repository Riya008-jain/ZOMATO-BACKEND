const {DataTypes, INTEGER}=require("sequelize");
const sequelize =require("./dbconnect");
 const User=sequelize.define("User",{
ID:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
},
NAMEE:{
type:DataTypes.STRING,
allowNull:false,
},
EMAIL :{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    },
    PASSWORDD :{
        type:DataTypes.STRING,
        allowNull:false,
        },
        PHONENUMBER :{
            type:DataTypes.INTEGER,
            allowNull:false,
            },
});
const menu=sequelize.define("menu",{
    ITEMID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    autoIncrement:true,
    },
    ITEMNAME:{
    type:DataTypes.STRING,
    allowNull:false,
    },
    ITEMDESCRIPTION :{
        type:DataTypes.STRING,
        allowNull:false,
        },
        ITEMPRICE:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        ITEMAVAILIBLITY  :{
            type:DataTypes.INTEGER,
            allowNull:false,
            },
            ITEMRATING  :{
                type:DataTypes.INTEGER,
                allowNull:false,
                },
                ISVEG:{
                    type:DataTypes.BOOLEAN
                }
    });
    const hotel= sequelize.define("hotel",{
        HOTELID:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        HOTELNAME:{
        type:DataTypes.STRING,
        allowNull:false,
        },
        HOTELADDRESS :{
            type:DataTypes.STRING,
            allowNull:false,
            },
            HOTELPHONE :{
                type:DataTypes.INTEGER,
                allowNull:false,
                },
                HOTELRATING :{
                    type:DataTypes.INTEGER,
                    },
HOTELSTATUS:{
    type:DataTypes.BOOLEAN,
}
 });
 const ordertable=sequelize.define("ordertable",{
    ORDERID:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    ID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        },
    ITEMID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        },
        HOTELID :{
            type:DataTypes.INTEGER,
            allowNull:false,
            },
            ORDERSTATUS:{
                type:DataTypes.STRING,
                allowNull:false,
            }
 });
 const ordertabledetails=sequelize.define("ordertabledetails",{
    ORDERID:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    ID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        },
        ITEMID :{
            type:DataTypes.INTEGER,
            allowNull:false,
            },
            PAYMENTMETHOD:{
                type:DataTypes.STRING,
                allowNull:false,
            },
            ITEMPRICE:{
                type:DataTypes.INTEGER,
                allowNull:false
            }
 });
        menu.belongsTo(hotel,{foreignKey:"HOTELID"});
        hotel.hasMany(menu,{foreignKey:"HOTELID"});
        User.hasMany(ordertable,{foreignKey:"ID"});
        ordertable.belongsTo(User,{foreignKey:"ID"});
        ordertabledetails.belongsTo(ordertable,{foreignKey:"ORDERID"});
        ordertable.hasMany(ordertabledetails,{foreignKey:"ORDERID"});
module.exports={User:User,hotel:hotel,menu:menu,ordertable:ordertable,ordertabledetails:ordertabledetails};
