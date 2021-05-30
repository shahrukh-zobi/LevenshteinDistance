using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LevenshteinController : ControllerBase
    {
        /// <summary>
        /// Get Minimum Distance
        /// </summary>
        /// <param name="stringA"></param>
        /// <param name="stringB"></param>
        /// <returns></returns>
        [HttpGet("GetMinimumDistance")]
        public IActionResult GetMinimumDistance(string stringA, string stringB)
        {
            if (string.IsNullOrEmpty(stringA) && string.IsNullOrEmpty(stringB))
                return BadRequest(new { message = "please provide two string to calculate minimum distance" });

            LevenshteinModel response = new LevenshteinModel() { Source = stringA, Target = stringB };

            List<int[]> listMatrix = new List<int[]>();

            if (string.IsNullOrEmpty(stringA) && !string.IsNullOrEmpty(stringB))
            {
                int[] row = new int[stringB.Length + 1];
                for (int i = 0; i < stringB.Length + 1; i++)
                {
                    row[i] = i;
                }

                listMatrix.Add(row);

                response.MinimumDistance = stringB.Length;
                response.ListMatrix = listMatrix;
                return Ok(response);
            }

            if (!string.IsNullOrEmpty(stringA) && string.IsNullOrEmpty(stringB))
            {
                for (int i = 0; i < stringA.Length + 1; i++)
                {
                    listMatrix.Add(new int[] { i });
                }
                response.MinimumDistance = stringA.Length;
                response.ListMatrix = listMatrix;
                return Ok(response);
            }

            var matrix = Utilities.CalculateDistanceOfString(stringA, stringB, out int minimumDistance);

            int rowLength = matrix.GetUpperBound(0);
            int columnLength = matrix.GetUpperBound(1);
            for (int i = 0; i <= rowLength; i++)
            {
                var row = new int[columnLength + 1];
                for (int j = 0; j <= columnLength; j++)
                {
                    row[j] = matrix[i, j];
                }
                listMatrix.Add(row);
            }

            response.MinimumDistance = minimumDistance;
            response.ListMatrix = listMatrix;
            return Ok(response);
        }
    }
}
