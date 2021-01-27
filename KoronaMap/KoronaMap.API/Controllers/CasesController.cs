using KoronaMap.DataAccess;
using KoronaMap.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KoronaMap.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CasesController : ControllerBase
    {
        private readonly ApiDbContext _ApiDbContext;
        public CasesController()
        {
            _ApiDbContext = new ApiDbContext();
        }

        [HttpGet]
        [Route("countries")]
        public ActionResult<List<Country>> GetCountries()
        {
            var countries = _ApiDbContext.Countries.ToList();
            var viruscases = _ApiDbContext.VirusCases.ToList();
            foreach (var country in countries)
            {
                country.TotalCase = _ApiDbContext.VirusCases.Where(v => v.CountryId == country.Id).Sum(v => v.Cases);
                country.TotalRecovered = _ApiDbContext.VirusCases.Where(v => v.CountryId == country.Id).Sum(v => v.Recovered);
                country.TotalDeaths = _ApiDbContext.VirusCases.Where(v => v.CountryId == country.Id).Sum(v => v.Deaths);
            }
            _ApiDbContext.SaveChanges();
            return Ok(countries.OrderByDescending(c => c.TotalCase));
        }

        /* Used Once for entry countries to database*/
        [HttpPost]
        [Route("getCountries")]
        public async Task<ActionResult> PostCountries([FromBody] Country country)
        {
            if (ModelState.IsValid)
            {
                await _ApiDbContext.Countries.AddAsync(country);
                await _ApiDbContext.SaveChangesAsync();
            }
            return Ok();
        }

        [HttpGet]
        [Route("global")]
        public ActionResult<VirusCase[]> GetGlobal()
        {
            VirusCase[] globalCases = new VirusCase[12];
            var allCases = _ApiDbContext.VirusCases;
            for (int i = 1; i <= 12; i++)
            {
                globalCases[i - 1] = new VirusCase();
                globalCases[i - 1].Cases = _ApiDbContext.VirusCases.Where(v => v.Date.Month == i).Sum(v => v.Cases);
                globalCases[i - 1].Recovered = _ApiDbContext.VirusCases.Where(v => v.Date.Month == i).Sum(v => v.Recovered);
                globalCases[i - 1].Deaths = _ApiDbContext.VirusCases.Where(v => v.Date.Month == i).Sum(v => v.Deaths);
            }

            return Ok(globalCases);
        }

        // GET api/<CasesController>/5
        [HttpGet("{id}")]
        public ActionResult<List<VirusCase>> GetCasesByCountryId(int id)
        {
            var cases = _ApiDbContext.VirusCases.Where(v => v.CountryId == id).ToList();
            return Ok(cases);
        }

        // POST api/<CasesController>
        [HttpPost]
        [Route("newcase")]
        public async Task<ActionResult> AddNewCase([FromBody] VirusCase virusCase)
        {
            if (ModelState.IsValid)
            {
                virusCase.Date = virusCase.Date.ToLocalTime();
                var result = await _ApiDbContext.VirusCases.FirstOrDefaultAsync(v => (DateTime.Compare(v.Date.Date, virusCase.Date.Date) == 0) &&
                                            (v.CountryId == virusCase.CountryId));
                if (result == null)
                {
                    await _ApiDbContext.VirusCases.AddAsync(virusCase);
                    await _ApiDbContext.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        // PUT api/<CasesController>/5
        [HttpPut]
        public ActionResult UpdateCase([FromBody] VirusCase virusCase)
        {
            if (ModelState.IsValid)
            {
                virusCase.Date = virusCase.Date.ToLocalTime();
                var result = _ApiDbContext.VirusCases.Where(v => (DateTime.Compare(v.Date.Date, virusCase.Date.Date) == 0) &&
                                        (v.CountryId == virusCase.CountryId)).Any();
                if (result)
                {
                    _ApiDbContext.Entry(virusCase).State = EntityState.Modified;
                    _ApiDbContext.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }
    }
}
