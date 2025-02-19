const express=require("express");
const {User,hotel,  ordertabledetails, menu, ordertable}=require("./module");
const { Json } = require("sequelize/lib/utils");
const res = require("express/lib/response");
const app=express(); 
const Port=2608;
app.use(express.json()) 
app.listen(Port,(e)=>{
    if(e)console.log("error");
    else console.log("Server is opned succesfully"+Port);
  })
app.get("/backendzomato",(req,res)=>{
res.status(200).send("HELLO WORLD");
});
app.post("/registerUserr",async(req,res)=>{
const{ID,NAMEE,EMAIL,PASSWORDD,PHONENUMBER}=req.body;
try{
await User.create({
  ID,
  NAMEE,
  EMAIL,
  PASSWORDD,
  PHONENUMBER
});
res.status(210).send("USER LOGIN SUCESSFULLY");
}
catch(e)
{
  console.log("error is there",e);
  res.send(500).status("error in your project ");
}
});
app.post("/login",async(req,res)=>{
  const{EMAIL,PASSWORDD}=req.body;
  const userinf=await User.findOne({where:{EMAIL:EMAIL}});
  if(userinf){
    const data=JSON.parse(JSON.stringify(userinf));
    console.log(data);
  }
  if(data.PASSWORDD==PASSWORDD){
    res.status(200).send("LOGIN SUCCCESFULLY");
  }
  else{
    res.status(401).send("LOGIN UNSCESFULLY SO REGISTER HERE");
  }
})
app.post("./hotel",async()=>{
  const{HOTELID ,
    HOTELNAME ,
    HOTELADDRESS, 
    HOTELPHONE ,
    HOTELRATING,
    HOTELSTATUS}=req.body;
  try{
     const newhotel=await hotel.create({HOTELID ,
      HOTELNAME ,
      HOTELADDRESS, 
      HOTELPHONE ,
      HOTELRATING,
      HOTELSTATUS});
  if(newhotel){
res.status(400).send("hotel login sucessfully");
  }
}
  catch(err){
    console.log(err);
    res.status(404).send("hotel login unsuccesfully");
  }
});
app.post("./menu",async()=>{
  const{ITEMID ,
    ITEMNAME,
    ITEMDESCRIPTION, 
    ITEMPRICE,
    ITEMAVAILIBLITY, 
    ITEMRATING,
    ISVEG}=req.body;
    try{
      const newmenus=await menu.create({ITEMID ,
        ITEMNAME ,
        ITEMDESCRIPTION, 
        ITEMPRICE ,
        ITEMAVAILIBLITY, 
        ITEMRATING ,
        ISVEG});
        if(newmenus){
          res.send(200).status("menus created");
        }
    }
    catch(err){
      res.send(400).status("menu table not created succesfully");
    }
});
app.post("./ordertable",async()=>{
  const{ORDERID ,
    ID ,
    ITEMID,
    HOTELID,
    ORDERSTATUS}=req.body;
    try{
      const neworder=await ordertabledetails.create({ORDERID ,
        ID ,
        ITEMID,
        HOTELID,
        ORDERSTATUS,
        ITEMPRICE,
      });
        if(neworder){
          try{
            //  get hotel id by the menu id and from hotel id get the hotel name.
            const newmenu=await menu.findbypk(ITEMID);
            const obj=(JSON.parse(JSON.stringify(newmenu)));
            console.log(obj);
            const HOTELID=obj.HOTELID;
            // creating an or extracting an orderif from the neworder id;
            const orderidobj=(JSON.parse(JSON.stringify(neworder)));
            // console.log(orderidobj);
            const ORDERID=orderidobj.ORDERID;
            const ordertable= await ordertable.create({
    ORDERID ,
    ID,
    HOTELID,
    ITEMID,
    ORDERSTATUS
            })
            if(ordertable){
              res.send(200).send("order created succesfully");
            }
          }
          catch(e){
            res.status(400).status("order created unsuccesfully");
          }
        }
    }
    catch(e){
      res.status(400).send("order details not found ");
    }
})