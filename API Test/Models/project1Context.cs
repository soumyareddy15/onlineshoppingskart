using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace API_Test.Models
{
    public partial class project1Context : DbContext
    {
        public project1Context()
        {
        }

        public project1Context(DbContextOptions<project1Context> options)
            : base(options)
        {
        }

        public virtual DbSet<TblCart> TblCarts { get; set; }
        public virtual DbSet<TblCategory> TblCategories { get; set; }
        public virtual DbSet<TblOrder> TblOrders { get; set; }
        public virtual DbSet<TblProduct> TblProducts { get; set; }
        public virtual DbSet<TblRetailer> TblRetailers { get; set; }
        public virtual DbSet<TblUser> TblUsers { get; set; }
        public virtual DbSet<Tblcompare> Tblcompares { get; set; }
        public virtual DbSet<Tblwishlist> Tblwishlists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-UO1SOET;Database=project1;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<TblCart>(entity =>
            {
                entity.HasKey(e => new { e.Cartid, e.Productid })
                    .HasName("PK__tblCart__73B74D1366A49963");

                entity.ToTable("tblCart");

                entity.Property(e => e.Cartid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("cartid");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Cartquantity).HasColumnName("cartquantity");

                entity.Property(e => e.Useremail)
                    .HasMaxLength(255)
                    .HasColumnName("useremail");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblCarts)
                    .HasForeignKey(d => d.Productid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblCart__product__44FF419A");

                entity.HasOne(d => d.UseremailNavigation)
                    .WithMany(p => p.TblCarts)
                    .HasForeignKey(d => d.Useremail)
                    .HasConstraintName("FK__tblCart__userema__440B1D61");
            });

            modelBuilder.Entity<TblCategory>(entity =>
            {
                entity.HasKey(e => e.Categoryid)
                    .HasName("PK__tblCateg__23CDE59029DDFFB9");

                entity.ToTable("tblCategory");

                entity.Property(e => e.Categoryid).HasColumnName("categoryid");

                entity.Property(e => e.Categorydescription).HasColumnName("categorydescription");

                entity.Property(e => e.Categoryname)
                    .IsRequired()
                    .HasColumnName("categoryname");
            });

            modelBuilder.Entity<TblOrder>(entity =>
            {
                entity.HasKey(e => new { e.Orderid, e.Productid })
                    .HasName("PK__tblOrder__3ADF45A6D3CF4E4F");

                entity.ToTable("tblOrder");

                entity.Property(e => e.Orderid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("orderid");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Orderdate)
                    .IsRequired()
                    .HasColumnName("orderdate");

                entity.Property(e => e.Orderquantity).HasColumnName("orderquantity");

                entity.Property(e => e.Retailerid).HasColumnName("retailerid");

                entity.Property(e => e.Useremail)
                    .HasMaxLength(255)
                    .HasColumnName("useremail");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblOrders)
                    .HasForeignKey(d => d.Productid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblOrder__produc__48CFD27E");

                entity.HasOne(d => d.Retailer)
                    .WithMany(p => p.TblOrders)
                    .HasForeignKey(d => d.Retailerid)
                    .HasConstraintName("FK__tblOrder__retail__49C3F6B7");

                entity.HasOne(d => d.UseremailNavigation)
                    .WithMany(p => p.TblOrders)
                    .HasForeignKey(d => d.Useremail)
                    .HasConstraintName("FK__tblOrder__userem__47DBAE45");
            });

            modelBuilder.Entity<TblProduct>(entity =>
            {
                entity.HasKey(e => e.Productid)
                    .HasName("PK__tblProdu__2D172D32307A0AB4");

                entity.ToTable("tblProduct");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Categoryid).HasColumnName("categoryid");

                entity.Property(e => e.Productbrand)
                    .HasMaxLength(45)
                    .IsUnicode(false)
                    .HasColumnName("productbrand");

                entity.Property(e => e.Productdescription).HasColumnName("productdescription");

                entity.Property(e => e.Productimage1).HasColumnName("productimage1");

                entity.Property(e => e.Productname)
                    .HasMaxLength(40)
                    .HasColumnName("productname");

                entity.Property(e => e.Productprice).HasColumnName("productprice");

                entity.Property(e => e.Productquantity).HasColumnName("productquantity");

                entity.Property(e => e.Retailerid).HasColumnName("retailerid");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.TblProducts)
                    .HasForeignKey(d => d.Categoryid)
                    .HasConstraintName("FK__tblProduc__categ__412EB0B6");

                entity.HasOne(d => d.Retailer)
                    .WithMany(p => p.TblProducts)
                    .HasForeignKey(d => d.Retailerid)
                    .HasConstraintName("FK__tblProduc__retai__403A8C7D");
            });

            modelBuilder.Entity<TblRetailer>(entity =>
            {
                entity.HasKey(e => e.Retailerid)
                    .HasName("PK__tblRetai__7A12C3E0C1F19F0C");

                entity.ToTable("tblRetailer");

                entity.HasIndex(e => e.Retaileremail, "UQ__tblRetai__F3B103331D9BAEE1")
                    .IsUnique();

                entity.Property(e => e.Retailerid).HasColumnName("retailerid");

                entity.Property(e => e.Approved)
                    .HasColumnName("approved")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Retaileremail)
                    .IsRequired()
                    .HasMaxLength(40)
                    .HasColumnName("retaileremail");

                entity.Property(e => e.Retailername)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("retailername");

                entity.Property(e => e.Retailerpassword)
                    .IsRequired()
                    .HasMaxLength(40)
                    .HasColumnName("retailerpassword");
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.HasKey(e => e.Useremail)
                    .HasName("PK__tblUser__870EAE607FEF69ED");

                entity.ToTable("tblUser");

                entity.HasIndex(e => e.Userphone, "UQ__tblUser__310EC0A112003C3F")
                    .IsUnique();

                entity.Property(e => e.Useremail)
                    .HasMaxLength(255)
                    .HasColumnName("useremail");

                entity.Property(e => e.Userapartment)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("userapartment");

                entity.Property(e => e.Usercountry)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("usercountry");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.Userpassword)
                    .IsRequired()
                    .HasColumnName("userpassword");

                entity.Property(e => e.Userphone)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("userphone");

                entity.Property(e => e.Userpincode)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("userpincode");

                entity.Property(e => e.Userstate)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("userstate");

                entity.Property(e => e.Userstreet)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("userstreet");

                entity.Property(e => e.Usertown)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("usertown");
            });

            modelBuilder.Entity<Tblcompare>(entity =>
            {
                entity.HasKey(e => e.Compareid)
                    .HasName("PK__tblcompa__6C2D579E3A9DF488");

                entity.ToTable("tblcompare");

                entity.Property(e => e.Compareid).HasColumnName("compareid");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Useremail)
                    .HasMaxLength(255)
                    .HasColumnName("useremail");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Tblcompares)
                    .HasForeignKey(d => d.Productid)
                    .HasConstraintName("FK__tblcompar__produ__71D1E811");

                entity.HasOne(d => d.UseremailNavigation)
                    .WithMany(p => p.Tblcompares)
                    .HasForeignKey(d => d.Useremail)
                    .HasConstraintName("FK__tblcompar__usere__70DDC3D8");
            });

            modelBuilder.Entity<Tblwishlist>(entity =>
            {
                entity.HasKey(e => e.Wishid)
                    .HasName("PK__tblwishl__D2E049D1553A0966");

                entity.ToTable("tblwishlist");

                entity.Property(e => e.Wishid).HasColumnName("wishid");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Useremail)
                    .HasMaxLength(255)
                    .HasColumnName("useremail");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Tblwishlists)
                    .HasForeignKey(d => d.Productid)
                    .HasConstraintName("FK__tblwishli__produ__75A278F5");

                entity.HasOne(d => d.UseremailNavigation)
                    .WithMany(p => p.Tblwishlists)
                    .HasForeignKey(d => d.Useremail)
                    .HasConstraintName("FK__tblwishli__usere__74AE54BC");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
