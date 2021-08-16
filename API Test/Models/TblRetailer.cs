using System;
using System.Collections.Generic;

#nullable disable

namespace API_Test.Models
{
    public partial class TblRetailer
    {
        public TblRetailer()
        {
            TblOrders = new HashSet<TblOrder>();
            TblProducts = new HashSet<TblProduct>();
        }

        public int Retailerid { get; set; }
        public string Retailername { get; set; }
        public string Retaileremail { get; set; }
        public string Retailerpassword { get; set; }
        public int? Approved { get; set; }

        public virtual ICollection<TblOrder> TblOrders { get; set; }
        public virtual ICollection<TblProduct> TblProducts { get; set; }
    }
}
