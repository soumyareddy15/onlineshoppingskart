using System;
using System.Collections.Generic;

#nullable disable

namespace API_Test.Models
{
    public partial class TblProduct
    {
        public TblProduct()
        {
            TblCarts = new HashSet<TblCart>();
            TblOrders = new HashSet<TblOrder>();
            Tblcompares = new HashSet<Tblcompare>();
            Tblwishlists = new HashSet<Tblwishlist>();
        }

        public int Productid { get; set; }
        public string Productname { get; set; }
        public double? Productprice { get; set; }
        public int? Productquantity { get; set; }
        public string Productdescription { get; set; }
        public string Productbrand { get; set; }
        public string Productimage1 { get; set; }
        public int? Retailerid { get; set; }
        public int? Categoryid { get; set; }

        public virtual TblCategory Category { get; set; }
        public virtual TblRetailer Retailer { get; set; }
        public virtual ICollection<TblCart> TblCarts { get; set; }
        public virtual ICollection<TblOrder> TblOrders { get; set; }
        public virtual ICollection<Tblcompare> Tblcompares { get; set; }
        public virtual ICollection<Tblwishlist> Tblwishlists { get; set; }
    }
}
