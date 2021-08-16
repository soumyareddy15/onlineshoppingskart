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
    public class FilterController : ControllerBase
    {
        private readonly project1Context db;
        public FilterController(project1Context context)
        {
            db = context;
        }

        #region Filterbyprice
        [Route("Filterbyprice")]
        public IActionResult GetPrice(string price)
        {

            switch (price)
            {
                case "0-1999":

                    return Ok(db.TblProducts.Where(s => s.Productprice < 2000).ToList());
                case "2000-9999":

                    return Ok(db.TblProducts.Where(s => s.Productprice >= 2000 && s.Productprice <= 9999).ToList());
                case "10000-80000":

                    return Ok(db.TblProducts.Where(s => s.Productprice >= 10000).ToList());
                default:

                    return BadRequest(" Product price out of range");
            }
        }

        #endregion

        #region Filter by category
        [Route("Filterbycategory")]
        public IActionResult GetCategory(string category)
        {


            switch (category)
            {
                case "Mobile and Accessories":
                    var mob = (from p in db.TblProducts
                               join c in db.TblCategories
                               on p.Categoryid equals c.Categoryid
                               select new
                               {
                                   p.Productname,
                                   p.Productprice,
                                   p.Productdescription,
                                   p.Productbrand,
                                   p.Productimage1,
                                   c.Categoryid,
                                   c.Categoryname
                               }).Where(c => c.Categoryname == "Mobile and Accessories").ToList();


                    return Ok(mob);

                case "TV and Home Entertainment":
                    var ent = (from p in db.TblProducts
                               join c in db.TblCategories
                               on p.Categoryid equals c.Categoryid
                               select new
                               {
                                   p.Productname,
                                   p.Productprice,
                                   p.Productdescription,
                                   p.Productbrand,
                                   p.Productimage1,
                                   c.Categoryid,
                                   c.Categoryname
                               }).Where(c => c.Categoryname == "TV and Home Entertainment").ToList();

                    return Ok(ent);
                case "Watches":
                    var watch = (from p in db.TblProducts
                                 join c in db.TblCategories
                                 on p.Categoryid equals c.Categoryid
                                 select new
                                 {
                                     p.Productname,
                                     p.Productprice,
                                     p.Productdescription,
                                     p.Productbrand,
                                     p.Productimage1,
                                     c.Categoryid,
                                     c.Categoryname
                                 }).Where(c => c.Categoryname == "Watches").ToList();


                    return Ok(watch);
                case "Shoes":
                    var shoes = (from p in db.TblProducts
                                 join c in db.TblCategories
                                 on p.Categoryid equals c.Categoryid
                                 select new
                                 {
                                     p.Productname,
                                     p.Productprice,
                                     p.Productdescription,
                                     p.Productbrand,
                                     p.Productimage1,
                                     c.Categoryid,
                                     c.Categoryname
                                 }).Where(c => c.Categoryname == "Shoes").ToList();


                    return Ok(shoes);
                case "Clothing":
                    var clothes = (from p in db.TblProducts
                                   join c in db.TblCategories
                                   on p.Categoryid equals c.Categoryid
                                   select new
                                   {
                                       p.Productname,
                                       p.Productprice,
                                       p.Productdescription,
                                       p.Productbrand,
                                       p.Productimage1,
                                       c.Categoryid,
                                       c.Categoryname
                                   }).Where(c => c.Categoryname == "Clothing").ToList();


                    return Ok(clothes);

                default:

                    return BadRequest("No such Category");
            }
        }
        #endregion

        #region Search Product
        [Route("SearchProduct")]
        public IActionResult GetSearchProduct(string search)
        {
            var result = db.TblProducts.Where(x => x.Productname.StartsWith(search) || search == null).ToList();

            return Ok(result);
        }
        #endregion
    }
}
