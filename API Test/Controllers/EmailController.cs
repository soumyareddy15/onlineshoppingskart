
using API_Test.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly project1Context db;
        public EmailController(project1Context context)
        {
            db = context;
        }
        #region Check User Email if Null or not
        public bool CheckEmail(string email)
        {
            var isValidEmail = db.TblUsers.Where(w => w.Useremail == email).FirstOrDefault();
            if (isValidEmail != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

        #region Send User Email For OTP 
        [Route("SendUserEmail")]
        [HttpGet]
        public async Task<int> SendEmail(string to)
        {
            if (CheckEmail(to) == true)
            {
                string from = "skartshopping1@gmail.com";
                string subject = "Welcome to online shopping";
                Random generator = new Random();
                int r = generator.Next(1000, 10000);
                string body = "Hello , Your otp is " + r;

                SmtpClient smtp = new SmtpClient();
                using SmtpClient email = new SmtpClient
                {
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    EnableSsl = true,
                    Host = "smtp.gmail.com",
                    Port = 587,
                    Credentials = new NetworkCredential("skartshopping1@gmail.com", "skart@123"),
                };
                email.Send("skartonlineshopping1@gmail.com", to, subject, body);

                return r;
            }
            else
            {
                return 0;
            }

        }
        #endregion

        #region Check Retailer Email Null or Not
        
        public bool CheckRetailerEmail(string email)
        {
            var isValidEmail = db.TblRetailers.Where(w => w.Retaileremail == email).FirstOrDefault();
            if (isValidEmail != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

        #region Send Email to Retailer for OTP
        [Route("SendRetailerEmail")]
        [HttpGet]
        public async Task<int> SendRetailerEmail(string to)
        {
            if (CheckRetailerEmail(to) == true)
            {
                string from = "skartshopping1@gmail.com";
                string subject = "Welcome to online shopping";
                Random generator = new Random();
                int r = generator.Next(1000, 10000);
                string body = "Hello , Your otp is " + r;

                SmtpClient smtp = new SmtpClient();
                using SmtpClient email = new SmtpClient
                {
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    EnableSsl = true,
                    Host = "smtp.gmail.com",
                    Port = 587,
                    Credentials = new NetworkCredential("skartshopping1@gmail.com", "skart@123"),
                };
                email.Send("skartonlineshopping1@gmail.com", to, subject, body);

                return r;
            }
            else
            {
                return 0;
            }

        }
        #endregion

        #region  UpdateUserPassword
        [Route("UpdateUserPassword")]
        [HttpPut]
        public dynamic UpdatePassword(string email, string password)
        {
           
            var query = db.TblUsers.Find(email);
            query.Userpassword = password;
            db.Entry(query).State = EntityState.Modified;
            db.SaveChanges();
        
            return Ok("Valid");
        }
        #endregion

        #region  Fetching retailer id
        public int getid(string retaileremail)
        {
            TblRetailer retailer = new TblRetailer();
            retailer.Retailerid = db.TblRetailers.First(x => x.Retaileremail == retaileremail).Retailerid;
            return retailer.Retailerid;
        }
        #endregion

        #region Update Retailer Password
        [Route("UpdateRetailerPassword")]
        [HttpPut]
        public dynamic UpdateRetailerPassword(string retaileremail, string retailerpassword)
        {
            
            int retailerid = getid(retaileremail);
            var query = db.TblRetailers.Find(retailerid);
            query.Retailerpassword = retailerpassword;
            db.Entry(query).State = EntityState.Modified;
            db.SaveChanges();
           
            return Ok("Valid");
        }
        #endregion

    }

}
