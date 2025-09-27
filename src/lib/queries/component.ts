//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { toast } from "@stanfordspezi/spezi-web-design-system";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { componentsApi } from "@/server/api/components";
import type { ExtractZod, PathValue } from "@/utils/types";
import { uploadImage } from "@/utils/uploadImage";
import { apiRequest } from "../apiRequest";

export const componentsQueryKeys = {
  all: ["component"],
  list: (params: ComponentListQueryOptionsParams) => [
    "component",
    "list",
    params,
  ],
  retrieve: (params: ComponentRetrieveQueryOptionsParams) => [
    "component",
    "retrieve",
    params,
  ],
} as const;

interface ComponentListQueryOptionsParams {
  studyId: string;
}

/**
 * Query options for fetching all components for a study.
 */
export const componentListQueryOptions = (
  params: ComponentListQueryOptionsParams,
) => {
  return queryOptions({
    queryKey: componentsQueryKeys.list(params),
    queryFn: () => {
      return apiRequest({
        route: componentsApi.routes.listForStudy,
        params: { studyId: params.studyId },
      });
    },
  });
};

interface ComponentRetrieveQueryOptionsParams {
  componentId: string;
}

/**
 * Query options for fetching a specific component by id.
 */
export const componentRetrieveQueryOptions = (
  params: ComponentRetrieveQueryOptionsParams,
) => {
  return queryOptions({
    queryKey: componentsQueryKeys.retrieve(params),
    queryFn: () => {
      return apiRequest({
        route: componentsApi.routes.retrieve,
        params: { id: params.componentId },
      });
    },
  });
};

type CreateComponentBody = ExtractZod<
  PathValue<
    typeof componentsApi.routes.createForStudy,
    ["request", "body", "content", "application/json", "schema"]
  >
>;

type UseCreateComponentMutationFnParams = CreateComponentBody & {
  studyId: string;
};

/**
 * Processes form data to handle image uploads before creating/updating a component.
 * Converts base64 image data to an uploaded image URL.
 */
export const uploadComponentImage = async <
  T extends CreateComponentBody | UpdateComponentBody,
>(
  data: T,
): Promise<T> => {
  if (data.type !== "information") {
    // Only information components can have images
    return data;
  }
  if (!data.image?.startsWith("data:")) {
    // No image or already a URL
    return data;
  }

  try {
    const uploadResult = await uploadImage({
      base64DataUrl: data.image,
    });

    return { ...data, image: uploadResult.url };
  } catch (error) {
    console.error("Failed to upload image:", error);
    toast.error("Image upload failed", {
      description:
        "The image could not be uploaded. The component will be created without an image.",
      duration: 5000,
    });
    // Continue without image rather than failing the entire operation
    return { ...data, image: null };
  }
};

/**
 * Mutation for creating a new component for a study.
 */
export const useCreateComponentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      studyId,
      ...data
    }: UseCreateComponentMutationFnParams) => {
      const body = await uploadComponentImage(data);
      return apiRequest<typeof componentsApi.routes.createForStudy, 201>({
        route: componentsApi.routes.createForStudy,
        params: { studyId },
        body,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: componentsQueryKeys.all,
      });
    },
    onError: (error) => {
      toast.error("Error creating component", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};

type UpdateComponentBody = ExtractZod<
  PathValue<
    typeof componentsApi.routes.update,
    ["request", "body", "content", "application/json", "schema"]
  >
>;

type UseUpdateComponentMutationFnParams = UpdateComponentBody & {
  componentId: string;
};

/**
 * Mutation for updating a component.
 */
export const useUpdateComponentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      componentId,
      ...data
    }: UseUpdateComponentMutationFnParams) => {
      const body = await uploadComponentImage(data);
      return apiRequest({
        route: componentsApi.routes.update,
        params: { id: componentId },
        body,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: componentsQueryKeys.all,
      });
    },
    onError: (error) => {
      toast.error("Error updating component", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};

interface UseDeleteComponentMutationFnParams {
  componentId: string;
  /** If provided, will target-invalidate the list for this study */
  studyId?: string;
}

/**
 * Mutation for deleting a component.
 */
export const useDeleteComponentMutation = ({
  onSuccess,
}: {
  // We need this callback to allow for an async navigation after deletion
  // but before the query invalidation happens. The mutater's onSuccess
  // cannot be async because react-query does not await it.
  onSuccess?: () => Promise<void>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ componentId }: UseDeleteComponentMutationFnParams) => {
      return apiRequest<typeof componentsApi.routes.remove, 204>({
        route: componentsApi.routes.remove,
        params: { id: componentId },
      });
    },
    onSuccess: async () => {
      await onSuccess?.();
      await queryClient.invalidateQueries({
        queryKey: componentsQueryKeys.all,
      });
    },
    onError: (error) => {
      toast.error("Error deleting component", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};
