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
    public class UserController : ControllerBase
    {
        private readonly project1Context db;
        public UserController(project1Context context)
        {
            db = context;
        }


        #region User login
        [Route("do-login")]
        [HttpGet]
        public IActionResult checkLogin(string useremail, string userpassword)
        {
            try
            {

                var user = db.TblUsers.SingleOrDefault(x => x.Useremail == useremail);
                var result = db.TblUsers.Where(x => x.Useremail == useremail).FirstOrDefault();
                //bool verified = BCrypt.Net.BCrypt.Verify(userpassword,user.Userpassword);
                
                var pass = db.TblUsers.Where(x => x.Userpassword == userpassword).FirstOrDefault();
                if (result != null && pass!= null)
                {

                    return Ok("Success");
                }
                else
                {

                    return Ok("invalid");
                }
            }
            catch (Exception e)
            {

                return Ok("invalid");
            }
        }
        #endregion

        #region Check Email for register user
        public bool CheckEmail(string email)
        {
            var isValidEmail = db.TblUsers.Where(w => w.Useremail == email).FirstOrDefault();
            if (isValidEmail == null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

        #region Check email for changing user password
        public bool CheckEmail1(string email, string userpassword)
        {
            try
            {
                var isValidEmail = db.TblUsers.Where(w => w.Useremail == email).FirstOrDefault();
                var pass = db.TblUsers.Where(w => w.Userpassword == userpassword).FirstOrDefault();
                if (isValidEmail != null && pass != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                return false;
            }

        }
        #endregion

        #region Register User
        [Route("RegisterUser")]
        [HttpPost]
        public IActionResult UserRegister(string useremail, string username, string userphone,
               string userpassword, string userapartment, string userstreet, string usertown, string userstate, string userpincode, string usercountry)
        {
            if (CheckEmail(useremail))
            {
                TblUser user = new TblUser()
                {
                    Useremail = useremail,
                    Username = username,
                    Userphone = userphone,
                    Userpassword = userpassword,
                   // Userpassword = BCrypt.Net.BCrypt.HashPassword(userpassword),
                    Userapartment = userapartment,
                    Userstreet = userstreet,
                    Usertown = usertown,
                    Userstate = userstate,
                    Userpincode = userpincode,
                    Usercountry = usercountry

                };
                db.TblUsers.Add(user);
                db.SaveChanges();

                return Ok("success");
            }

            return Ok("invalid");

        }
        #endregion

        #region Change User Password
        [Route("userchangepassword")]
        [HttpPut]
        public IActionResult changeUserPassword(string useremail, string userpassword, string newpassword)
        {
            if (CheckEmail1(useremail, userpassword))
            {
                var query = db.TblUsers.Find(useremail);
                query.Userpassword = newpassword;
                db.Entry(query).State = EntityState.Modified;
                db.SaveChanges();
                return Ok("Success");
            }
            else
            {
                return Ok("invalid");
            }
        }
        #endregion
    }
}
