using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyFightBook.Modals;
using MyFightBook.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace MyFightBook.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.totalclubcount = Variables.Clubcount;
            ViewBag.totaleventcount = Variables.Eventcount;
            ViewBag.totalfighters = Variables.Fightercount;
            ViewBag.Servertime = DateTime.Now;
            ViewBag.eventtournamentlist = Variables.EventTournamentList;
            //ViewBag.BaseUrl = _constants.BaseUrl;
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
