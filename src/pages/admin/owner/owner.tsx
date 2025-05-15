import { useCallback, useMemo, useState } from "react";
import { Button, Empty, Space, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { PageCardLayout } from "@/layouts/page-card-layout";
import { EUserType } from "@/modules/shared/types/user-type";
import { AddEditWaiterModal } from "@/modules/owner/organisms/add-edit-waiter-modal";
import { ownerApi } from "@/modules/owner/api";

import type { ColumnType } from "antd/es/table";
import type { TWaiter } from "@/modules/shared/types/waiter";

const AdminOwnerPage = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [isAddEditWaiterModalOpen, setIsAddEditWaiterModalOpen] =
    useState(false);
  const [waiterToEdit, setWaiterToEdit] = useState<TWaiter | null>(null);

  const openAddEditWaiterModal = () => setIsAddEditWaiterModalOpen(true);
  const closeAddEditWaiterModal = () => {
    setWaiterToEdit(null);
    setIsAddEditWaiterModalOpen(false);
  };

  const { mutateAsync: deleteWaiter, isPending: isDeletingWaiter } =
    useMutation({
      mutationKey: ["delete-waiter"],
      mutationFn: ownerApi.deleteWaiter,
      onError: (error) => {
        console.error(error);
        enqueueSnackbar("There was an error while deleting the waiter", {
          variant: "error",
        });
      },
    });

  const onEditWaiter = useCallback(
    (waiter: TWaiter) => () => {
      setWaiterToEdit(waiter);
      openAddEditWaiterModal();
    },
    [],
  );

  const onDeleteWaiter = useCallback(
    (waiter: TWaiter) => async () => {
      try {
        await deleteWaiter(waiter.id);
        await queryClient.refetchQueries({ queryKey: ["waiters"] });
      } catch {}
    },
    [],
  );

  const onRefetchWaiters = async () => {
    await queryClient.refetchQueries({ queryKey: ["waiters"] });
  };

  const { data: waiters, isPending: isLoadingWaiters } = useQuery({
    queryKey: ["waiters"],
    queryFn: ownerApi.getWaiters,
    select: (res) => res.data as TWaiter[],
  });

  const waitersTableColumns = useMemo<ColumnType<TWaiter>[]>(
    () => [
      {
        dataIndex: "username",
        title: "Username",
      },
      {
        dataIndex: "orderCount",
        title: "Orders served",
        width: "100px",
        sorter: (a, b) => (a.orderCount ?? 0) - (b.orderCount ?? 0),
      },
      {
        dataIndex: "_actions_",
        title: "Actions",
        width: "104px",
        render: (_, waiter: TWaiter) => (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={onEditWaiter(waiter)}
              type="text"
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={onDeleteWaiter(waiter)}
              type="text"
            />
          </Space>
        ),
      },
    ],
    [onEditWaiter, onDeleteWaiter],
  );

  const isLoading = isLoadingWaiters || isDeletingWaiter;

  return (
    <>
      <AddEditWaiterModal
        onClose={closeAddEditWaiterModal}
        open={isAddEditWaiterModalOpen}
        waiter={waiterToEdit}
      />
      <PageCardLayout
        className="admin-owner-page"
        userType={EUserType.OWNER}
        headerRightContent={
          <>
            <Button
              disabled={isLoading}
              icon={<PlusOutlined />}
              onClick={openAddEditWaiterModal}
              type="primary"
            >
              Add waiter
            </Button>
            <Button
              disabled={isLoading}
              icon={<ReloadOutlined />}
              onClick={onRefetchWaiters}
              type="text"
            />
          </>
        }
      >
        {isLoading && !waiters?.length ? <LoadingOutlined /> : null}
        {!isLoading && !waiters?.length ? <Empty /> : null}
        {!isLoading && waiters?.length ? (
          <Table
            columns={waitersTableColumns}
            dataSource={waiters}
            pagination={{ position: ["bottomCenter"], hideOnSinglePage: true }}
          />
        ) : null}
      </PageCardLayout>
    </>
  );
};

export { AdminOwnerPage };
