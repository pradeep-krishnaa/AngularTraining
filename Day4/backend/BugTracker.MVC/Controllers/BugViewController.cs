using BugTracker.MVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;

namespace BugTracker.MVC.Controllers
{
    public class BugViewController : Controller
    {
        private readonly HttpClient _httpClient;

        public BugViewController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("BugAPI"); // 👈 Uses the named client
        }

        public async Task<IActionResult> Index()
        {
            // ✅ This combines BaseAddress (set in Program.cs) + "bug"
            var bugs = await _httpClient.GetFromJsonAsync<List<BugViewModel>>("bug");

            if (bugs == null || !bugs.Any())
            {
                ViewBag.Message = "No bugs found!";
            }

            return View(bugs);
        }

        public async Task<IActionResult> Details(int id)
        {
            var response = await _httpClient.GetAsync($"bug/{id}");
            if (!response.IsSuccessStatusCode)
            {
                return NotFound();
            }

            var json = await response.Content.ReadAsStringAsync();
            var bug = JsonSerializer.Deserialize<BugViewModel>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return View(bug);
        }
    }
}
