import { Button, Form, Input, Modal } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { ownerApi } from "@/modules/owner/api";

import type {
  TWaiter,
  TWaiterCreatePayload,
} from "@/modules/shared/types/waiter";

type AddWaiterModalProps = {
  open: boolean;
  onClose: () => void;
  waiter?: TWaiter | null;
};

const AddEditWaiterModal = (props: AddWaiterModalProps) => {
  const { open, onClose, waiter } = props;

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const [form] = Form.useForm();

  const { mutateAsync: createWaiter, isPending: isCreatingWaiter } =
    useMutation({
      mutationKey: ["create-waiter"],
      mutationFn: ownerApi.createWaiter,
      onError: (error) => {
        console.error(error);
        enqueueSnackbar("There was an error while creating the waiter", {
          variant: "error",
        });
      },
    });
  const { mutateAsync: updateWaiter, isPending: isUpdatingWaiter } =
    useMutation({
      mutationKey: ["update-waiter"],
      mutationFn: ownerApi.updateWaiter,
      onError: (error) => {
        console.error(error);
        enqueueSnackbar("There was an error while updating the waiter", {
          variant: "error",
        });
      },
    });

  const onSubmit = async (fields: TWaiterCreatePayload) => {
    try {
      if (!waiter) {
        await createWaiter(fields);
      } else {
        await updateWaiter({
          ...fields,
          id: waiter.id,
        });
      }
      onClose();
      await queryClient.refetchQueries({ queryKey: ["waiters"] });
    } catch {}
  };

  const onAddWaiter = () => form.submit();

  const isLoading = isCreatingWaiter || isUpdatingWaiter;

  const formInitialValues = {
    username: waiter?.username ?? "",
    password: "",
  };

  useEffect(() => {
    form.setFieldsValue(formInitialValues);
  }, [waiter]);

  return (
    <Form
      disabled={isLoading}
      form={form}
      initialValues={formInitialValues}
      onFinish={onSubmit}
    >
      <Modal
        centered
        closable={!isLoading}
        maskClosable={!isLoading}
        onCancel={onClose}
        open={open}
        title="Add waiter"
        width={300}
        footer={
          <Button
            block
            disabled={isLoading}
            loading={isLoading}
            onClick={onAddWaiter}
            type="primary"
          >
            {waiter ? "Update" : "Add"}
          </Button>
        }
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Username is required" }]}
          style={{ marginTop: 24 }}
        >
          <Input disabled={isLoading} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={
            !waiter
              ? [{ required: true, message: "Password is required" }]
              : undefined
          }
        >
          <Input disabled={isLoading} placeholder="Password" type="password" />
        </Form.Item>
      </Modal>
    </Form>
  );
};

export { AddEditWaiterModal };
