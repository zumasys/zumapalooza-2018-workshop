using System;
using RestSharp;



namespace _1172
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            var client = new RestClient("http://localhost:20002/api/helloworld?name=Patrick");
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);
        }
    }
}