"use client";
import dynamic from "next/dynamic";
import React, { memo, useEffect, useRef, useState } from "react";
import "./ProductDetail.scss";
import { toast } from "react-toastify";
import ImageFallback from "../generalComponents/FallbackNextImage";
import { useRouter } from "next/navigation";
import Modal from "../generalComponents/modal";
import QuillEditor from "./QuillEditor";
import { handleDeleteProduct } from "./handleDeleteProduct";
export default function ProductDetail(props: {
  productInfo: productInfo | undefined;
  categoryList: categoriesDTO[];
}) {
  const { productInfo } = props;
  const { categoryList } = props;
  const router = useRouter();
  const productId = productInfo?.PRODUCT_ID || -1;
  const productDescription = useRef<string>(
    productInfo?.PRODUCT_DESCRIPTION || ""
  );
  const [numberVariation, setNumberVariation] = useState<number>(0);
  const [logoState, setLogoState] = useState<string>(
    productInfo?.PRODUCT_LOGO_IMAGE || "/imagenotfound.jfif"
  );
  const [categoriesLst, setCategoryLst] = useState<categoriesDTO[]>(
    productInfo?.categories || [
      {
        CATEGORY_ID: categoryList[0].CATEGORY_ID,
        CATEGORY_NAME: categoryList[0].CATEGORY_NAME,
      },
    ]
  );
  const [showModal, setShowModal] = useState(false);
  const quillModule = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        "link",
        // "image",
        "video",
      ],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const addProductVariation = () => {
    setNumberVariation(numberVariation + 1);
  };
  const delProductVariation = () => {
    if (numberVariation > 0) setNumberVariation(numberVariation - 1);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData();
    let listVariationID = e.currentTarget.elements.namedItem("variationId") as
      | NodeList
      | HTMLInputElement;
    let listVariationPrice = e.currentTarget.elements.namedItem(
      "variationPrice"
    ) as NodeList | HTMLInputElement;
    let listVariationAmount = e.currentTarget.elements.namedItem(
      "variationAmount"
    ) as NodeList | HTMLInputElement;
    let listVariationUnit = e.currentTarget.elements.namedItem(
      "variationUnit"
    ) as NodeList | HTMLInputElement;
    let listProductCategory = e.currentTarget.elements.namedItem(
      "categoriesLst"
    ) as NodeList | HTMLSelectElement;
    let arrProductCategory: number[] = [];
    if ((listProductCategory as any).value != "") {
      let categoriesId = (listProductCategory as any as HTMLSelectElement)
        .value;
      arrProductCategory.push(Number(categoriesId));
    } else
      for (let i = 0; i < listProductCategory.length; i++) {
        let categoriesId = (listProductCategory[i] as HTMLSelectElement).value;
        arrProductCategory[i] = Number(categoriesId);
      }
    let arrVariation: VARIATION_INFO[] = [];
    if ("length" in listVariationID)
      for (let i = 0; i < listVariationID.length; i++) {
        let VARIATION_ID = (listVariationID[i] as HTMLInputElement).value;
        let AMOUNT: number = Number(
          ((listVariationAmount as any)[i] as HTMLInputElement).value
        );
        let PRICE: number = Number(
          ((listVariationPrice as any)[i] as HTMLInputElement).value
        );
        let UNIT: String = (
          (listVariationUnit as any)[i] as HTMLInputElement
        ).value.trim();
        if (
          UNIT.length == 0 ||
          Number.isNaN(AMOUNT) ||
          AMOUNT < 0 ||
          Number.isNaN(PRICE) ||
          PRICE < 0
        )
          return toast.error("Vui lòng nhập đúng và đủ dữ liệu", {
            autoClose: 1000,
          });
        arrVariation[i] = {
          VARIATION_ID: VARIATION_ID,
          AMOUNT: AMOUNT,
          PRICE: PRICE,
          UNIT: UNIT,
        };
      }
    else {
      let VARIATION_ID = (listVariationID as HTMLInputElement).value;
      let AMOUNT: number = Number(
        (listVariationAmount as HTMLInputElement).value
      );
      let PRICE: number = Number(
        (listVariationPrice as HTMLInputElement).value
      );
      let UNIT: String = (listVariationUnit as HTMLInputElement).value.trim();
      if (
        UNIT.length == 0 ||
        Number.isNaN(AMOUNT) ||
        AMOUNT < 0 ||
        Number.isNaN(PRICE) ||
        PRICE < 0
      )
        return toast.error("Vui lòng nhập đúng và đủ dữ liệu", {
          autoClose: 1000,
        });
      arrVariation[0] = {
        VARIATION_ID: VARIATION_ID,
        AMOUNT: AMOUNT,
        PRICE: PRICE,
        UNIT: UNIT,
      };
    }

    let PRODUCT_NAME: string = (
      e.currentTarget.elements.namedItem("productionName") as HTMLInputElement
    ).value;
    if (PRODUCT_NAME.trim().length == 0) return;
    let PRODUCT_DESCRIPTION: string = productDescription.current;
    let PRODUCT_LOGO_IMAGE: File | null = (
      e.currentTarget.elements.namedItem("logoImage") as HTMLInputElement
    ).files![0];
    formData.append("PRODUCT_NAME", PRODUCT_NAME);
    if (PRODUCT_LOGO_IMAGE != null)
      formData.append("PRODUCT_LOGO_IMAGE", PRODUCT_LOGO_IMAGE);
    formData.append("PRODUCT_ID", productId.toString());
    formData.append("PRODUCT_DESCRIPTION", PRODUCT_DESCRIPTION);
    formData.append("product_variation", JSON.stringify(arrVariation));
    formData.append("categories", JSON.stringify(arrProductCategory));
    const response: Response = await fetch(
      productInfo == undefined
        ? "http://localhost:8081/admin/createProduct"
        : "http://localhost:8081/admin/updateProduct",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      let res: { success: boolean; message: string | undefined | null } =
        await response.json();
      if (!res.success) {
        toast.error(res.message || "Error", { autoClose: 1000 });
        return;
      }
      toast.success(`${title} thành công , Mã sản phẩm là ${res.message} `, {
        autoClose: 1100,
      });
      return router.replace("/storemanage");
    } else {
      return toast.error("Error", { autoClose: 1000 });
    }
  };

  let title = productInfo == undefined ? "Thêm mới" : "Cập nhật";
  const handleImageChange = (e: any) => {
    if (e.target?.files[0] != null)
      setLogoState(URL.createObjectURL(e.target?.files[0]));
  };
  const addProductCategory = () => {
    setCategoryLst([
      ...categoriesLst,
      {
        CATEGORY_ID: categoryList[0].CATEGORY_ID,
        CATEGORY_NAME: categoryList[0].CATEGORY_NAME,
      },
    ]);
  };
  const delProductCategory = () => {
    if (categoriesLst.length >= 2) {
      setCategoryLst([...categoriesLst].slice(0, -1));
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          handle={() => handleDeleteProduct(productId)}
          hide={() => setShowModal(false)}
          title="Xóa sản phẩm này ?"
          content={"Xóa sản phẩm có id là" + productId}
          action="Xóa"
        />
      )}
      <form
        className="max-w-screen-xl mx-auto"
        onSubmit={handleSubmit}
        id="productForm"
      >
        <div className=" w-full flex justify-between flex-wrap">
          {/* img         */}
          <div className="w-full h-fit lg:w-4/12 ">
            <ImageFallback
              src={logoState}
              fallbackSrc={"/imagenotfound.jfif"}
              className={"mx-auto w-fit h-auto max-h-[300px]"}
              id="logoPreviewImage"
            />
            <input
              type="file"
              name="logoImage"
              className=" w-30 h-10 mx-auto"
              accept="image/png"
              onChange={handleImageChange}
            />
          </div>
          <div className="w-full lg:w-8/12 flex flex-col p-3">
            {/* img         */}
            <div className="">
              <span className="font-semibold text-lg text-black py-1">
                Tên sản phẩm
              </span>
              <input
                className="font-semibold text-[#3d71e7] text-lg rounded w-full"
                type="text"
                name="productionName"
                defaultValue={productInfo?.PRODUCT_NAME}
              />
            </div>

            <hr className="my-2" />
            <div className="my-1">
              <span className="py-2 font-medium text-lg mb-1">
                Phân loại hàng :
              </span>
              <div className="flex flex-row flex-wrap">
                {categoriesLst.map((item, index) => {
                  return (
                    <RenderListProduct
                      CATEGORY_ID={item.CATEGORY_ID}
                      categoryList={categoryList}
                      key={item.CATEGORY_ID + index.toString()}
                    />
                  );
                })}
                <div
                  className="flex flex-row w-full justify-evenly
                "
                >
                  <button
                    type="button"
                    className="mx-auto w-46 bg-blue-600 p-4 py-3 rounded-md mt-2 text-base text-white font-semibold shadow"
                    onClick={addProductCategory}
                  >
                    Thêm phân loại hàng
                  </button>
                  <button
                    type="button"
                    className="mx-auto w-46 bg-red-600 p-4 py-3 rounded-md mt-2 text-base text-white font-semibold shadow"
                    onClick={delProductCategory}
                  >
                    Xóa phân loại hàng
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <span className="py-2 font-medium text-lg mb-1">Loại hàng</span>
              <ul className="ps-3" id="productVariationList">
                {productInfo?.product_variation.map((item, index) => {
                  return (
                    <li key={index}>
                      <input
                        type="hidden"
                        name="variationId"
                        value={item.VARIATION_ID}
                      />
                      <div className="">
                        <span className="inline-block">Ten loai hang</span>
                        <input
                          type="text"
                          className="w-full rounded"
                          defaultValue={item.UNIT}
                          name="variationUnit"
                          required
                        />
                      </div>
                      <div className="flex flex-row">
                        <div className=" my-2 inline-block w-1/2">
                          <span className="block  me-3">Gia</span>
                          <input
                            type="number"
                            className="w-max text-red-400 rounded"
                            defaultValue={item.PRICE}
                            name="variationPrice"
                            required
                          />
                        </div>
                        <div className=" my-2 inline-block w-1/2">
                          <span className="block me-3">So luong :</span>
                          <input
                            type="number"
                            className="w-max rounded"
                            defaultValue={item.AMOUNT}
                            name="variationAmount"
                            required
                          />
                        </div>
                      </div>
                      <hr className="h-[2px] bg-slate-400" />
                    </li>
                  );
                })}
                {[...Array(numberVariation)].map((v, i) => (
                  <li key={i}>
                    <input type="hidden" name="variationId" value={""} />
                    <div className="">
                      <span className="inline-block">Ten loai hang</span>
                      <input
                        type="text"
                        className="w-full rounded"
                        name="variationUnit"
                        required
                      />
                    </div>
                    <div className="flex flex-row">
                      <div className=" my-2 inline-block w-1/2">
                        <span className="block  me-3">Gia</span>
                        <input
                          type="number"
                          className="w-max text-red-400 rounded"
                          name="variationPrice"
                          required
                        />
                      </div>
                      <div className=" my-2 inline-block w-1/2">
                        <span className="block me-3">So luong :</span>
                        <input
                          type="number"
                          className="w-max rounded"
                          name="variationAmount"
                          required
                        />
                      </div>
                    </div>
                    <hr className="h-[2px] bg-slate-400" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-row">
              <button
                type="button"
                className="mx-auto w-44 bg-blue-600 p-4 py-3 rounded-md mt-2 text-base text-white font-semibold shadow"
                onClick={addProductVariation}
              >
                Thêm loại hàng
              </button>
              <button
                type="button"
                className="mx-auto w-44 bg-red-600 p-4 py-3 rounded-md mt-2 text-base text-white font-semibold shadow"
                onClick={delProductVariation}
              >
                Xóa loại hàng
              </button>
            </div>
          </div>
        </div>
        <div className="my-3 mt-4 w-full  flex flex-wrap">
          <div className="w-full ">
            <h5 className="text-blue-600  font-medium text-2xl underline-offset-4 underline mb-5 ms-2">
              Mô tả sản phẩm
            </h5>
            <QuillEditor
              defaultValue={productInfo?.PRODUCT_DESCRIPTION}
              quillModule={quillModule}
              refValue={productDescription}
            />
          </div>
        </div>
        <div className="flex flex-row justify-evenly">
          <button
            type="submit"
            className="mx-auto w-44 bg-blue-600 p-4 py-3 rounded-md mt-2 text-base text-white font-semibold shadow block"
          >
            {title}
          </button>
          {productInfo != undefined && (
            <button
              type="button"
              className="mx-auto w-44 bg-red-500 p-4 py-3 rounded-md mt-2 text-base text-white font-semibold shadow block"
              onClick={() => setShowModal(true)}
            >
              Xóa sản phẩm
            </button>
          )}
        </div>
      </form>
    </>
  );
}
const RenderListProduct = ({
  CATEGORY_ID,
  categoryList,
}: {
  CATEGORY_ID: number;
  categoryList: categoriesDTO[];
}) => {
  return (
    <select
      name="categoriesLst"
      key={CATEGORY_ID}
      defaultValue={CATEGORY_ID}
      className="rounded m-2"
    >
      {categoryList.map((item, index) => {
        return (
          <option key={item.CATEGORY_ID} value={item.CATEGORY_ID}>
            {item.CATEGORY_NAME}
          </option>
        );
      })}
    </select>
  );
};
