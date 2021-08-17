var clubDocument = function () {
    const init = function () {
        $('.file-uploader input[type="file"]').change(function(e) {
            var thisFile = $(this);
            if (e.target.files[0] !== undefined) {
                var fileName = e.target.files[0].name;
                var extArr = fileName.split(".");
                var ext = extArr[extArr.length - 1];

                $("#FileName").val(fileName);
                $("#FileExt").val(ext.toLowerCase());
                var extensions =
                    "jpg,jpeg,gif,png,webp,svg,psd,zip,txt,pdf,doc,docx,dotx,xls,xlsx,xltx,ppt,pptx,pot,potx,ppsx,sldx";
                var extArr1 = extensions.split(",");

                if (jQuery.inArray(ext.toLowerCase(), extArr1) === -1) {
                    thisFile.val("");
                    $(this).parent().find('input[type="text"]').val("");
                    thisFile.closest(".file-uploader").find(".delete-icon").removeAttr("style");
                    thisFile.closest(".file-uploader").find(".delete-icon").hide();
                    alert(
                        "Please select only these file extensions .jpg, .jpeg, .gif, .png, .webp, .svg, .psd, .zip, .txt, .pdf, .doc, .docx, .dotx, .xls, .xlsx, .xltx, .ppt, .pptx, .pot, .potx, .ppsx, .sldx");
                    return false;
                }

                const size = (this.files[0].size / 1024 / 1024).toFixed(2);
                if (size > 24) {
                    thisFile.val("");
                    $(this).parent().find('input[type="text"]').val("");
                    thisFile.closest(".file-uploader").find(".delete-icon").removeAttr("style");
                    thisFile.closest(".file-uploader").find(".delete-icon").hide();
                    alert("File too Big, please select a file less than 25mb");
                    return false;
                }

                $(this).parent().find('input[type="text"]').val(fileName);
                if (e.target.files && e.target.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function() {
                        //var imagePath = "";
                        if (ext.toLowerCase() === "zip") {
                            //imagePath = "/backend-assets/img/zip.png";
                        } else if (ext.toLowerCase() === "pdf") {
                            //imagePath = "/backend-assets/img/pdf.png";
                        } else if (ext.toLowerCase() === "xlsx" ||
                            ext.toLowerCase() === "xls" ||
                            ext.toLowerCase() === "csv") {
                            //imagePath = "/backend-assets/img/xls.png";
                        } else if (ext.toLowerCase() === "doc" ||
                            ext.toLowerCase() === "docx" ||
                            ext.toLowerCase() === "txt") {
                            //imagePath = "/backend-assets/img/Google_Doc_Logo.jpg";
                        }
                        //else {
                        //    //imagePath = a.target.result;
                        //}
                        thisFile.closest(".file-uploader").find(".delete-icon").removeAttr("style");
                    }
                    reader.readAsDataURL(e.target.files[0]);
                }
            } else {
                $(this).parent().find('input[type="text"]').val("");
                thisFile.closest(".file-uploader").find(".delete-icon").removeAttr("style");
                thisFile.closest(".file-uploader").find(".delete-icon").hide();
            }

            return true;
        });

        $(".file-uploader .OpenImgUpload").click(function (e) {
            e.preventDefault();
            const id = $(this).parent().find(".file-upload").attr("id");//.trigger('click');
            const uploader = document.getElementById(id);
            uploader.click();
        });

        $(".file-uploader .delete-icon").click(function () {
            $(this).closest(".file-uploader").find(".file-input input").val("");
            $(this).removeAttr("style");
            $(this).hide();
        });

        $("#documentcreate").click(function () {
            if ($("#attachmentid").val() !== "" && $("#attachmentid").val() != null) {
                app.showLoader();
                $(this).attr("disabled", "disabled");
                $("#documentcreateSubmit").click();
            }
            else {
                alert("Please select file.");
            }
        });

        $(".delete-btn").click(function () {
            app.showLoader();
            const model = {};
            model.DocumentId = $(this).closest("tr").attr("data-id");
            model.ModelId = $("#ModelId").val();
            const url = "documents/deletedocument";
            app.fetchPost(url, model, function (response) {
                if (response) {
                    window.location.reload();
                }
                else {
                    app.hideLoader();
                    alert("something wants wrong !!");
                }
            });
        });

        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    };
    return {
        init: init
    }
}();