using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebAPI
{
    public class Utilities
    {
        public static string GenerateAccessToken(string userName, IConfiguration _configuration)
        {
            var signingKey = Encoding.UTF8.GetBytes(_configuration["Jwt:SigningSecret"]);
            var expiryDuration = int.Parse(_configuration["Jwt:ExpiryDuration"]);

            var secretKey = new SymmetricSecurityKey(signingKey);
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);


            var tokeOptions = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: new List<Claim> {
                     new Claim(ClaimTypes.Name, userName)},
                expires: DateTime.Now.AddMinutes(expiryDuration),
                signingCredentials: signinCredentials
            );

            var token = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return token;
        }

        public static int[,] CalculateDistanceOfString(string stringA, string stringB, out int minimumDistance)
        {
            int cost;
            int[,] result = new int[stringA.Length + 1, stringB.Length + 1];
            int min1;
            int min2;
            int min3;

            for (int i = 0; i <= result.GetUpperBound(0); i += 1)
            {
                result[i, 0] = i;
            }

            for (int i = 0; i <= result.GetUpperBound(1); i += 1)
            {
                result[0, i] = i;
            }

            for (int i = 1; i <= result.GetUpperBound(0); i += 1)
            {
                for (int j = 1; j <= result.GetUpperBound(1); j += 1)
                {
                    cost = (stringA[i - 1] != stringB[j - 1]) ? 1 : 0;

                    min1 = result[i - 1, j] + 1;
                    min2 = result[i, j - 1] + 1;
                    min3 = result[i - 1, j - 1] + cost;
                    result[i, j] = Math.Min(Math.Min(min1, min2), min3);
                }
            }

            minimumDistance = result[result.GetUpperBound(0), result.GetUpperBound(1)];
            return result;
        }



    }
}
