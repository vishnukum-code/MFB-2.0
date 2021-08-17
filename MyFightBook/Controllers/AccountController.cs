using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using MyFightBook.Contracts;
using MyFightBook.Modals;
using Newtonsoft.Json;
using System;
using System.Text;
using System.Threading.Tasks;

namespace MyFightBook.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserRegistration _UserRegister;
        private readonly IUserLogin _userLogin;
        private readonly IEmailService _emailService;
        public AccountController(IUserRegistration userRegistration, IUserLogin userLogin, IEmailService emailService)
        {
            _UserRegister = userRegistration;
            _userLogin = userLogin;
            _emailService = emailService;
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
                    ModelState.AddModelError("error", Result.Code);
                }
                return View(UserMoadal);
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
                if(result.Status==false)
                {
                    ModelState.AddModelError("error", result.Message);
                    return View(login);
                }
            }
            return View(login);
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
        [HttpGet, AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            FogotPSDModel fogotPSDModel = new();
            return View(fogotPSDModel);
        }
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(FogotPSDModel fogotPSDModel)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var result = await _emailService.SendResetPasswordEmail(fogotPSDModel.Email);
                    if (result.Code !=null)
                    {
                        TempData["EmailModal"] = JsonConvert.SerializeObject(result);
                        return RedirectToAction("ResetPassword", "Account");
                    }
                    ModelState.AddModelError("error", "Email not exists");
                    return View(fogotPSDModel);
                }
                return View(fogotPSDModel);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("error", ex.Message);
                return View(fogotPSDModel);
            }
        }
        public IActionResult ResetPassword()
        {
            try
            {
                if (TempData["EmailModal"] != null)
                {
                    var res = JsonConvert.DeserializeObject<RegisterResult>((string)TempData["EmailModal"]);
                    TempData.Keep("EmailModal");
                    ResetPassword model = new ResetPassword() { Code=
                        Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(res.Code))};
                    return View(model);
                }
                return RedirectToAction("ForgotPassword", "Account");
            }
            catch (Exception ex)
            {
                return RedirectToAction("ForgotPassword", "Account");
            }
        }
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = await _emailService.ResetPasswordAsync(resetPassword);
                    if (res.Status)
                    {
                        return RedirectToAction("Login", "Account");
                    }
                    ModelState.AddModelError("error", res.Message);
                    return View(resetPassword);
                }
                return View(resetPassword);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("error", ex.Message);
                return View(resetPassword);
            }
        }
        public async Task<IActionResult> SignOut()
        {
            var res = await _userLogin.SignOutF();
            return RedirectToAction("Index", "Home");
        }

    }
}
