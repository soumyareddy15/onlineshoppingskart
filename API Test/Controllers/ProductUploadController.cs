using API_Test.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductUploadController : ControllerBase
    {
        private readonly project1Context db;
       

        public ProductUploadController(project1Context context, IWebHostEnvironment hostEnvironment)
        {
            db = context;
          

        }

        #region Get Retailers Id
        [Route("GetRetailersId")]
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

        #region Getproducts
        [Route("Getproducts")]
        [HttpGet]
        public IActionResult Get()
        {
            var product = db.TblProducts.ToList();
            if (product.Count > 0)
            {
                return Ok(product);
            }
            else
            {
                return BadRequest("No data found");
            }
        }
        #endregion

        #region Insert Into Cart
        [Route("InsertIntoCart")]
        [HttpPost]
        public IActionResult InsertCart(string useremail, int productid, int cartquantity)
        {
            TblCart cart = new TblCart()
            {
                Useremail = useremail,
                Productid = productid,
                Cartquantity = cartquantity
            };
            db.TblCarts.Add(cart);
            db.SaveChanges();
            return Ok("Success");
        }
        #endregion

        #region Insert Into Compare
        [Route("InsertIntoCompare")]
        [HttpPost]
        public IActionResult InsertCompare(string useremail, int productid)
        {

            Tblcompare cart = new Tblcompare()
            {
                Useremail = useremail,
                Productid = productid,

            };
            db.Tblcompares.Add(cart);
            db.SaveChanges();
            return Ok("Success");
        }

        #endregion

        #region Insert Into Wishlist
        [Route("InsertIntoWishlist")]
        [HttpPost]
        public IActionResult InsertWishlist(string useremail, int productid)
        {

            Tblwishlist cart = new Tblwishlist()
            {
                Useremail = useremail,
                Productid = productid,

            };
            db.Tblwishlists.Add(cart);
            db.SaveChanges();
            return Ok("Success");
        }
        #endregion

        #region Get User Cart
        [Route("GetUserCart")]
        [HttpGet]
        public IActionResult getUserCart(string useremail)
        {

            var result = from c in db.TblCarts
                         join p in db.TblProducts
                         on c.Productid equals p.Productid
                         join r in db.TblRetailers on p.Retailerid equals r.Retailerid
                         join ct in db.TblCategories on p.Categoryid equals ct.Categoryid
                         where c.Useremail == useremail
                         select new
                         {
                             p.Productid,
                             p.Productname,
                             p.Productimage1,
                             p.Productdescription,
                             p.Productprice,
                             ct.Categoryname,
                             c.Useremail,
                             c.Cartquantity,
                             r.Retailerid,
                             r.Retailername,
                             r.Retaileremail,
                             c.Cartid,
                             total = c.Cartquantity * p.Productprice
                         };
           
            return Ok(result);
        }
        #endregion

        #region Compare Products
        [Route("GetUserCompare")]
        [HttpGet]
        public IActionResult getUserCompare(string useremail)
        {

            var result = from c in db.Tblcompares
                         join p in db.TblProducts
                         on c.Productid equals p.Productid
                         join r in db.TblRetailers on p.Retailerid equals r.Retailerid
                         join ct in db.TblCategories on p.Categoryid equals ct.Categoryid
                         where c.Useremail == useremail
                         select new
                         {
                             p.Productid,
                             p.Productname,
                             p.Productimage1,
                             p.Productdescription,
                             p.Productprice,
                             ct.Categoryname,
                             c.Useremail,

                             r.Retailerid,
                             r.Retailername,
                             r.Retaileremail,
                             c.Compareid,

                         };

            return Ok(result);
        }
        #endregion

        #region GetUserWishlist
        [Route("GetUserWishlist")]
        [HttpGet]
        public IActionResult getUserWishlist(string useremail)
        {

            var result = from c in db.Tblwishlists
                         join p in db.TblProducts
                         on c.Productid equals p.Productid
                         join r in db.TblRetailers on p.Retailerid equals r.Retailerid
                         join ct in db.TblCategories on p.Categoryid equals ct.Categoryid
                         where c.Useremail == useremail
                         select new
                         {
                             p.Productid,
                             p.Productname,
                             p.Productimage1,
                             p.Productdescription,
                             p.Productprice,
                             ct.Categoryname,
                             c.Useremail,

                             r.Retailerid,
                             r.Retailername,
                             r.Retaileremail,
                             c.Wishid,

                         };

            return Ok(result);
        }
        #endregion

        #region RemoveFromCart
        [Route("RemoveFromCart")]
        [HttpDelete]
        public IActionResult removeFromCart(int cartid, int productid)
        {

            TblCart result = db.TblCarts.Find(cartid, productid);
            db.TblCarts.Remove(result);
            db.SaveChanges();
            return Ok("Success");

        }
        #endregion

        #region Remove From Compare 
        [Route("RemoveFromCompare")]
        [HttpDelete]
        public IActionResult removeFromCompare(int compareid)
        {

            Tblcompare result = db.Tblcompares.Find(compareid);
            db.Tblcompares.Remove(result);
            db.SaveChanges();
            return Ok("Success");

        }
        #endregion

        #region RemoveFromWishlist
        [Route("RemoveFromWishlist")]
        [HttpDelete]
        public IActionResult removeFromWishlist(int Wishid)
        {

            Tblwishlist result = db.Tblwishlists.Find(Wishid);
            db.Tblwishlists.Remove(result);
            db.SaveChanges();
            return Ok("Success");

        }
        #endregion

        #region GetSubtotal
        [Route("GetSubtotal")]
        [HttpGet]
        public IActionResult getSubtotal(string useremail)
        {
            var result = (from p in db.TblProducts
                          join c in db.TblCarts
                          on p.Productid equals c.Productid
                          where c.Useremail == useremail
                          select new
                          {
                              p.Productprice
                          }).ToList();

            double sum = (double)result.Sum(x => x.Productprice);
            double count = result.Count();
            List<double> resultnew = new List<double>() { count, sum };
            return Ok(resultnew);
        }
        #endregion

        #region PurchaseProduct
        [Route("PurchaseProduct")]
        [HttpPost]
        public IActionResult purchaseProduct(string useremail, int productid, int retailerid, int orderquantity)
        {
            string date = DateTime.Now.ToString();

            TblOrder order = new TblOrder()
            {
                Orderdate = date,
                Useremail = useremail,
                Productid = productid,
                Retailerid = retailerid,
                Orderquantity = orderquantity

            };
            db.TblOrders.Add(order);
            db.SaveChanges();
            return Ok("Success");
        }
        #endregion


        #region Product upload
         [HttpPost]
         [Route("UploadImage")]
         public IActionResult UploadImage(string retailerid,string productname, string productquantity,string productprice,string productdescription,string productbrand, string categoryid,string Image)
         {

            TblProduct product = new TblProduct()
                {
                Productname= productname,
                Productprice = Convert.ToDouble(productprice),
                Productquantity = Convert.ToInt32(productquantity),
                Productdescription = productdescription,
                Productbrand = productbrand,
                Productimage1 = Image,
                Retailerid = Convert.ToInt32( retailerid),
                Categoryid = Convert.ToInt32(categoryid)



            };
                db.TblProducts.Add(product);
                db.SaveChanges();

                return Ok("success");
            }
        #endregion

    }


}
