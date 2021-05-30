using System.Collections.Generic;

namespace WebAPI.Models
{
    public class LevenshteinModel
    {
        public string Source { get; set; }
        public string Target { get; set; }
        public int MinimumDistance { get; set; }
        public List<int[]> ListMatrix { get; set; }
    }
}
