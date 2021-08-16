using System;
using System.Collections.Generic;

#nullable disable

namespace API_Test.Models
{
    public partial class TblOrder
    {
        public int Orderid { get; set; }
        public string Orderdate { get; set; }
        public string Useremail { get; set; }
        public int Productid { get; set; }
        public int? Retailerid { get; set; }
        public int? Orderquantity { get; set; }

        public virtual TblProduct Product { get; set; }
        public virtual TblRetailer Retailer { get; set; }
        public virtual TblUser UseremailNavigation { get; set; }
    }
}
