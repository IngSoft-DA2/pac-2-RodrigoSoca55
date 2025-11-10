using Microsoft.AspNetCore.Mvc;
using BackApi.Services;

namespace BackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReflectionController : ControllerBase
    {
        private readonly IReflectionService _reflectionService;

        public ReflectionController(IReflectionService reflectionService)
        {
            _reflectionService = reflectionService;
        }

        [HttpGet("importers")]
        public async Task<ActionResult<string[]>> GetImporters()
        {
            try
            {
                var importerDlls = await _reflectionService.GetImporterDllsAsync();
                return Ok(importerDlls);
            }
            catch (Exception)
            {
                return Ok(new string[] { });
            }
        }
    }
}
