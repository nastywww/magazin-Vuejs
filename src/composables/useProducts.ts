import { ref, computed } from "vue";
import { Product } from "../models/models";

interface UseProductsOptions {
  searchQuery?: string;
  inStock?: boolean;
  limit?: number;
  skip?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const products = ref<Product[]>([]);
  const total = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const BASELIMIT = 20;

  const searchQuery = ref(options.searchQuery || "");
  const inStock = ref(options.inStock || undefined);
  const limit = ref(options.limit || BASELIMIT);
  const skip = ref(options.skip || 0);

  const fetchProducts = async (params?: UseProductsOptions) => {
    loading.value = true;
    error.value = null;
    if (params) {
      searchQuery.value = params.searchQuery || "";
      inStock.value = params.inStock || undefined;
      limit.value = params.limit || BASELIMIT;
      skip.value = params.skip || 0;
    }

    try {
      let url = "https://dummyjson.com/products/search";

      const params = new URLSearchParams();

      if (searchQuery.value) {
        params.append("q", searchQuery.value);
      }

      // if (inStock.value) {
      //   params.append("q", inStock.value ? "In Stock" : "Low Stock");
      // }

      params.append("limit", limit.value.toString());
      params.append("skip", skip.value.toString());

      const queryString = params.toString();
      const finalUrl = `${url}${queryString ? "?" + queryString : ""}`;

      const response = await fetch(finalUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      products.value = (result.products as Product[]) || [];
      total.value = result.total || 0;

      if (inStock.value) {
        products.value = products.value.filter((p) => p.stock > 0);
      }
    } catch (err) {
      error.value = (err as Error).message;
      console.error("Ошибка при загрузке данных: ", err);
    } finally {
      loading.value = false;
    }
  };

  const totalPages = computed(() => Math.ceil(total.value / limit.value));
  const currentPage = computed(() => Math.floor(skip.value / limit.value) + 1);

  return {
    products,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    fetchProducts: fetchProducts,
  };
}
