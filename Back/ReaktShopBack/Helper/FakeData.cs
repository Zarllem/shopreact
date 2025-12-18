namespace ReaktShopBack.Helper
{
    public static class FakeData
    {
        public static List<Product> _products = new List<Product>()
        {
            new Product()
            {
                Id = 1,
                Name = "321",
                Price = 1000,
            },
            new Product()
            {
                Id = 2,
                Name = "123",
                Price = 2000,
            }
        };
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
    }
}
