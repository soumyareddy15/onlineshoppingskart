using System;
using System.Collections.Generic;

#nullable disable

namespace API_Test.Models
{
    public partial class TblCart
    {
        public int Cartid { get; set; }
        public string Useremail { get; set; }
        public int Productid { get; set; }
        public int? Cartquantity { get; set; }

        public virtual TblProduct Product { get; set; }
        public virtual TblUser UseremailNavigation { get; set; }
    }
}
