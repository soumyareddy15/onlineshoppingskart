using API_Test.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRetailerController : ControllerBase
    {
        private readonly project1Context db;
        public UserRetailerController(project1Context context)
        {
            db = context;
        }
        #region Get User Profile
        [Route("GetUserProfile")]
        [HttpGet]
        public IActionResult GetUserProfile(string uemail)
        {
            DateTime newdate;

            var uprof = (from u in db.TblUsers
                         join o in db.TblOrders
                         on u.Useremail equals o.Useremail
                         join p in db.TblProducts
                         on o.Productid equals p.Productid
                         orderby o.Orderdate descending
                         select new
                         {
                             u.Useremail,
                             u.Username,
                             u.Userphone,
                             u.Userapartment,
                             u.Userstreet,
                             u.Usertown,
                             u.Userstate,
                             u.Userpincode,
                             u.Usercountry,
                             o.Orderid,
                             o.Orderdate,
                             p.Productname,
                             p.Productprice,
                             p.Productbrand,
                             p.Productdescription,
                             o.Orderquantity,

                         }).Where(u => u.Useremail == uemail).ToList();

            return Ok(uprof);
        }
        #endregion

        #region GetRetailerProfile
        [Route("GetRetailerProfile")]
        [HttpGet]
        public IActionResult GetRetailerProfile(string retaileremail)
        {
            var rprof = (from r in db.TblRetailers
                         join p in db.TblProducts
                         on r.Retailerid equals p.Retailerid
                         join o in db.TblOrders
                         on p.Productid equals o.Productid
                         let RetailerRevenue = Decimal.Multiply((decimal)p.Productprice, (decimal)o.Orderquantity)
                         
                         select new
                         {
                             r.Retailerid,
                             r.Retailername,
                             r.Retaileremail,
                             p.Productname,
                             p.Productprice,
                             p.Productbrand,
                             o.Useremail,
                             o.Orderquantity,
                             RetailerRevenue = Decimal.Multiply((decimal)p.Productprice, (decimal)o.Orderquantity)

                         }).Where(r => r.Retaileremail == retaileremail).ToList();

            return Ok(rprof);
        }
        #endregion

        #region fetch user information
        [Route("GetProfile")]
        [HttpGet]
        public IActionResult GetProfile(string uemail)
        {
            var result = db.TblUsers.Where(x => x.Useremail == uemail).ToList();
            return Ok(result);
        }
        #endregion
    }
}
