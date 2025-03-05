using System.Text.Json;

namespace CarRent.Server.Helpers
{
    public static class JsonConverterHelper
    {
        public static string SerializeToJson<T>(T obj) where T : class
        {
            return JsonSerializer.Serialize(obj, new JsonSerializerOptions { WriteIndented = false });
        }

        public static List<string> DeserializeFromJson(string json)
        {
            if (string.IsNullOrEmpty(json))
                return new List<string>();

            try
            {
                return JsonSerializer.Deserialize<List<string>>(json, new JsonSerializerOptions()) ?? new List<string>();
            }
            catch
            {
                return new List<string>();
            }
        }
    }
}
