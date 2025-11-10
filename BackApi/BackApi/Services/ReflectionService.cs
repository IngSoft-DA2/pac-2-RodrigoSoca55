using System.Reflection;
using IImporter;

namespace BackApi.Services
{
    public interface IReflectionService
    {
        Task<string[]> GetImporterDllsAsync();
    }

    public class ReflectionService : IReflectionService
    {
        public async Task<string[]> GetImporterDllsAsync()
        {
            return await Task.Run(() =>
            {
                try
                {
                    var reflectionDirectory = Path.Combine(Directory.GetCurrentDirectory(), "reflection");
                    
                    if (!Directory.Exists(reflectionDirectory))
                    {
                        return new string[] { };
                    }

                    var dllFiles = Directory.GetFiles(reflectionDirectory, "*.dll");
                    var validDlls = new List<string>();

                    foreach (var dllFile in dllFiles)
                    {
                        try
                        {
                            var assembly = Assembly.LoadFrom(dllFile);
                            
                            var types = assembly.GetTypes();
                            
                            var importerTypes = types.Where(type => 
                                type.IsPublic && 
                                !type.IsAbstract && 
                                typeof(ImporterInterface).IsAssignableFrom(type))
                                .ToList();

                            if (importerTypes.Any())
                            {
                                validDlls.Add(Path.GetFileName(dllFile));
                            }
                        }
                        catch (Exception)
                        {
                            continue;
                        }
                    }

                    return validDlls.ToArray();
                }
                catch (Exception)
                {
                    return new string[] { };
                }
            });
        }
    }
}