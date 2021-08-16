using System;
using System.Collections.Generic;

#nullable disable

namespace API_Test.Models
{
    public partial class Tblcompare
    {
        public int Compareid { get; set; }
        public string Useremail { get; set; }
        public int? Productid { get; set; }

        public virtual TblProduct Product { get; set; }
        public virtual TblUser UseremailNavigation { get; set; }
    }
}
