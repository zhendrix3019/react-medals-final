[Route("api/[controller]")]
[ApiController]
public class CountryController : ControllerBase
{
    private readonly MedalsContext _context;

    public CountryController(MedalsContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public ActionResult<Country> GetCountry(int id)
    {
        var country = _context.Countries.Find(id);
        if (country == null) return NotFound();
        return country;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Country>> GetCountries()
    {
        return _context.Countries.ToList();
    }

    [HttpPost]
    public ActionResult<Country> PostCountry(Country country)
    {
        _context.Countries.Add(country);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetCountry), new { id = country.Id }, country);
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteCountry(int id)
    {
        var country = _context.Countries.Find(id);
        if (country == null) return NotFound();

        _context.Countries.Remove(country);
        _context.SaveChanges();
        return NoContent();
    }
}
