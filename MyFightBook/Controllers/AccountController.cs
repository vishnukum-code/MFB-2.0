using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFightBook.Contracts;
using MyFightBook.Modals;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace MyFightBook.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserRegistration _UserRegister;
        private readonly IUserLogin _userLogin;
        public AccountController(IUserRegistration userRegistration, IUserLogin userLogin)
        {
            _UserRegister = userRegistration;
            _userLogin = userLogin;
        }

        [HttpGet, AllowAnonymous]
        public IActionResult Register()
        {
            User ModalUser = new User();
            return View(ModalUser);
        }
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Register(User UserMoadal)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var Result = await _UserRegister.UserRegistrationFAsync(UserMoadal);
                    if (Result.Userid != string.Empty && Result.Code != string.Empty)
                    {
                        TempData["IDwithCode"] = JsonConvert.SerializeObject(Result);
                        return RedirectToAction("EmailVerifi", "Account");
                    }
                }
                User user = new User();
                return View(user);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet, AllowAnonymous]
        public IActionResult Login()
        {
            Login ModalUser = new Login();
            return View(ModalUser);
        }
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Login(Login login)
        {
            if (ModelState.IsValid)
            {
                var result = await _userLogin.IsUserLoged(login);
            }
            Login ModalUser = new Login();
            return View(ModalUser);
        }

        [HttpGet, AllowAnonymous]
        public IActionResult EmailVerifi()
        {
            try
            {
                RegisterResult registerResult = TempData["IDwithCode"] != null ? JsonConvert.DeserializeObject<RegisterResult>((string)TempData["IDwithCode"]) : null;
                TempData.Keep("IDwithCode");
                if (registerResult != null)
                {
                    ViewBag.id = registerResult.Userid;
                    ViewBag.code = registerResult.Code;
                    return View();
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        [HttpGet, AllowAnonymous]
        public async Task<IActionResult> EmailVerification(string Userid, string code)
        {
            try
            {
                if (Userid != null && Userid != string.Empty && code != null && code != string.Empty)
                {
                    var Result = await _userLogin.EmailVerficationF(Userid, code);
                    if (Result.Status == true)
                    {
                        TempData.Remove("IDwithCode");
                        return RedirectToAction("Login");
                    }
                    ViewBag["Error"] = Result.Message;
                    return View();
                }
                ViewBag.Error = "userId Not Valid!";
                return View();
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View();
            }
        }

        public async Task<IActionResult> SignOut()
        {
            var res = await _userLogin.SignOutF();
            return RedirectToAction("Index", "Home");
        }

    }
}
