import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  background: "#FBECE0", // خلفية بين البني والأبيض (لون البيج/الكريمي)
  color: "#633d2f",      // النص باللون البني الغامق
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
