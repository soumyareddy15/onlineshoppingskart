using System;
using System.Collections.Generic;

#nullable disable

namespace API_Test.Models
{
    public partial class TblUser
    {
        public TblUser()
        {
            TblCarts = new HashSet<TblCart>();
            TblOrders = new HashSet<TblOrder>();
            Tblcompares = new HashSet<Tblcompare>();
            Tblwishlists = new HashSet<Tblwishlist>();
        }

        public string Useremail { get; set; }
        public string Username { get; set; }
        public string Userphone { get; set; }
        public string Userpassword { get; set; }
        public string Userapartment { get; set; }
        public string Userstreet { get; set; }
        public string Usertown { get; set; }
        public string Userstate { get; set; }
        public string Userpincode { get; set; }
        public string Usercountry { get; set; }

        public virtual ICollection<TblCart> TblCarts { get; set; }
        public virtual ICollection<TblOrder> TblOrders { get; set; }
        public virtual ICollection<Tblcompare> Tblcompares { get; set; }
        public virtual ICollection<Tblwishlist> Tblwishlists { get; set; }
    }
}
