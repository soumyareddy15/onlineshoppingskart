using API_Test.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetailerController : ControllerBase
    {
        private readonly project1Context db;
        public RetailerController(project1Context context)
        {
            db = context;
        }
        #region retailer-login
        [Route("retailer-login")]
        [HttpGet]
        public IActionResult getRetailer(string retaileremail, string retailerpassword)
        {
            var retailer = db.TblRetailers.Where(x => x.Retaileremail == retaileremail
            && x.Retailerpassword == retailerpassword && x.Approved == 1).ToList();
            //var ret = db.TblRetailers.SingleOrDefault(x => x.Retaileremail == retaileremail);
            //bool verified = BCrypt.Net.BCrypt.Verify(retailerpassword, ret.Retailerpassword);
            //&& x.Retailerpassword == retailerpassword && x.Approved == 1).ToList();
            if (retailer.Count > 0)
            //if(retailer!=null && verified==true)
            {

                return Ok("Valid");
            }
            else
            {

                return Ok("Invalid");

            }
        }
        #endregion

        #region get-retailerid
        [Route("get-retailerid")]
        [HttpGet]
        public IActionResult getRetailerId(string retaileremail)
        {
            var retailer = db.TblRetailers.Where(x => x.Retaileremail == retaileremail).Select(x => x.Retailerid);
            if (retailer != null)
            {

                return Ok(retailer);
            }
            else
            {

                return Ok("Invalid");
            }
        }
        #endregion

        #region retailer-register
        [Route("retailer-register")]
        [HttpPost]

        public IActionResult register(string retailername, string retaileremail, string retailerpassword)
        {
            try
            {
                TblRetailer retailer = new TblRetailer()
                {
                    Retailername = retailername,
                    Retaileremail = retaileremail,
                    Retailerpassword = retailerpassword,
                    //Retailerpassword = BCrypt.Net.BCrypt.HashPassword(retailerpassword),
                    Approved = 0

                };

                db.TblRetailers.Add(retailer);
                db.SaveChanges();

                return Ok("Valid");
            }
            catch (Exception e)
            {

                return Ok("Invalid");
            }
        }
        #endregion

        #region Check Retailer to change password
        public bool CheckRetailer(string retaileremail, string oldpassword)
        {
            var result = db.TblRetailers.Where(x => x.Retaileremail == retaileremail);
            try
            {
                var pass = db.TblRetailers.Where(x => x.Retailerpassword == oldpassword);
            }
            catch (Exception e)
            {
                return false;
            }
            if (result != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

        #region get id of retailer
        public int getid(string retaileremail, string retailerpassword)
        {
            TblRetailer retailer = new TblRetailer();
            if (CheckRetailer(retaileremail, retailerpassword))
            {
                try
                {
                    retailer.Retailerid = db.TblRetailers.First(x => x.Retaileremail == retaileremail &&
                    x.Retailerpassword == retailerpassword).Retailerid;
                    return retailer.Retailerid;
                }
                catch (Exception e)
                {
                    return 0;
                }

            }
            return 0;

        }
        #endregion

        #region Change Retailer Passsword
        [Route("ChangePassword")]
        [HttpPut]
        public IActionResult ChangePass(string retaileremail, string retailerpassword, string newpassword)
        {

            if (CheckRetailer(retaileremail, retailerpassword))
            {
                int retailerid = getid(retaileremail, retailerpassword);
                if (retailerid != 0)
                {
                    var query = db.TblRetailers.Find(retailerid);
                    query.Retailerpassword = newpassword;
                    db.Entry(query).State = EntityState.Modified;
                    db.SaveChanges();

                    return Ok("Success");
                }
                else
                {

                    return Ok("Invalid");
                }

            }
            else
            {

                return Ok("Invalid");
            }
        }
        #endregion
    }
}
