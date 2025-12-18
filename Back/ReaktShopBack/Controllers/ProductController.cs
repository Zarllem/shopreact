using CoreData.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReaktShopBack.Helper;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace ReaktShopBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly ShopReactContext _context;

        public ProductController(ShopReactContext context)
        {
            _context = context;
        }

        [HttpGet("One")]
        public async Task<IActionResult> GetOneProduct(Guid id)
        {
            var _products = await _context.Products.Include(x=>x.Brand).ToListAsync();
            var myProduct = _products.Where(x=>x.Id == id).Select(x=> new ProductFullDto()
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description ?? "Нет описания",
                Image = "/images/кроссы.jpg",
                Price = x.Price??0,
                Score = x.Scor??0,
                Brand = x.Brand?.Name


            }).FirstOrDefault();
            if(myProduct == null)
            {
                return BadRequest("Товара нет");
            }
            return Ok(myProduct);
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllProduct()
        {
            var _products = await _context.Products.Include(x=>x.Brand).ToListAsync();
            var listMyProduct = _products.Select(x => new ProductCardDto()
            {
                Id = x.Id,
                Name = x.Name,
                Image = "/images/кроссы.jpg",
                Price = x.Price ?? 0,
                Score = x.Scor ?? 0,
                Brand = x.Brand?.Name,
            }).ToList();
            return Ok(listMyProduct);
        }

        [HttpGet("CartProducts")]
        public async Task<IActionResult> GetCartProduct([FromQuery] List<Guid> ids)
        {
            var _products = await _context.Products.Include(x => x.Brand).Where(x => x.IsActive == true && ids.Contains(x.Id)).ToListAsync();
            var listProducts = _products.Select(x => new ProductCardDto()
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price ?? 0,
                Brand = x.Brand?.Name
            }).ToList();
            return Ok(listProducts);
        }
    }

    public class ProductCardDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public long Price { get; set; }
        public long Score { get; set; }
        public string? Brand { get; set; }

    }
    public class ProductFullDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public long Price { get; set; }
        public long Score { get; set; }
        public string? Brand { get; set; }

    }
    public class ProductCartDto
    {
        public Guid Id { get; set; }
        public int Count { get; set; }
    }


}
