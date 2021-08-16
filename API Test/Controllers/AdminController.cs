using API_Test.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly project1Context db;
        public AdminController(project1Context context)
        {
            db = context;
        }
        #region Admin Dashboard
        
        [Route("admin-dashboard")]
        [HttpGet]

        public IActionResult getRetailers()
        {
            var retailers = db.TblRetailers.Where(x => x.Approved == 0).ToList();
            if (retailers.Count > 0)
            {

                return Ok(retailers);
            }
            else
            {

                return Ok("No Retailers");
            }
        }
        #endregion

        #region Approve Retailer By Admin
        [Route("approve-retailer")]
        [HttpPut]
        public IActionResult ApproveRetailer(int retailerid, string retaileremail)
        {
            var retailer = db.TblRetailers.Find(retailerid);
            retailer.Approved = 1;
            db.Entry(retailer).State = EntityState.Modified;
            db.SaveChanges();

            return Ok("Approved");
        }
        #endregion

    }
}
